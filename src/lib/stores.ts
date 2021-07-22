import { Writable, writable } from 'svelte/store';
export const notifications: Writable<{ id: number; title: string; body: string }[]> = writable([]);

export const addNote = (title: string, body: string): void => {
	const id = Math.random();
	notifications.update((n) => [...n, { id, title, body }]);
};

export const removeNote = (id: number): void => {
	notifications.update((n) => n.filter((note) => note.id !== id));
};
