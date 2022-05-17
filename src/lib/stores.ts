import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Notification } from './types';

export const notifications: Writable<Notification[]> = writable([]);

const timeouts = {};

export const notify = (notification: Notification): void => {
	const id = Math.random();
	notification.id = id;
	const timeout = notification.timeout || 5;
	notifications.update((n) => [...n, notification]);
	if (timeout > 0) {
		const handler = setTimeout(() => {
			removeNote(id);
		}, timeout * 1000);
		timeouts[id] = handler;
	}
};

export const removeNote = (id: number): void => {
	notifications.update((n) => n.filter((note) => note.id !== id));
	if (timeouts[id]) {
		clearTimeout(timeouts[id]);
		delete timeouts[id];
	}
};
