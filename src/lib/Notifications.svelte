<script lang="ts">
	import { notifications, removeNote } from '$lib/stores';
	//import { Toast, ToastBody, ToastHeader } from 'sveltestrap';

	import { slide } from 'svelte/transition';

	import { Position } from '$lib/types';

	export let position: Position = Position.TopLeft;
	let classes;
	function toClassName(value) {
		let result = '';
		if (typeof value === 'string' || typeof value === 'number') {
			result += value;
		} else if (typeof value === 'object') {
			if (Array.isArray(value)) {
				result = value.map(toClassName).filter(Boolean).join(' ');
			} else {
				for (let key in value) {
					if (value[key]) {
						result && (result += ' ');
						result += key;
					}
				}
			}
		}
		return result;
	}
	function classnames(...args) {
		return args.map(toClassName).filter(Boolean).join(' ');
	}

	$: switch (position) {
		case Position.TopLeft:
			classes = classnames('p-3', 'top-0', 'start-0');
			break;
		case Position.TopCenter:
		case Position.Top:
			classes = classnames('p-3', 'top-0', 'start-50', 'translate-middle-x');
			break;
		case Position.Left:
			classes = classnames('p-3', 'top-50', 'start-0', 'translate-middle-y');
			break;
		case Position.Right:
			classes = classnames('p-3', 'top-50', 'end-0', 'translate-middle-y');
			break;
		case Position.Center:
			classes = classnames('p-3', 'top-50', 'start-50', 'translate-middle');
			break;
		case Position.BottomLeft:
			classes = classnames('p-3', 'bottom-0', 'start-0');
			break;
		case Position.BottomCenter:
		case Position.Bottom:
			classes = classnames(
				'position-absolute',
				'p-3',
				'bottom-0',
				'start-50',
				'translate-middle-x'
			);
			break;
		case Position.BottomRight:
			classes = classnames('p-3', 'bottom-0', 'end-0');
			break;
		case Position.TopRight:
		default:
			classes = classnames('p-3', 'top-0', 'end-0');
			break;
	}

	const textLight = {
		primary: true,
		secondary: true,
		danger: true,
		success: true,
		warning: false,
		info: false,
		light: false
	};

	function typeToClass(type: string) {
		let classes = [];
		if (type) {
			classes.push(`bg-${type}`);

			if (textLight[type]) {
				classes.push('text-light');
			} else {
				classes.push('text-dark');
			}
			return classes.join(' ');
		}
		return '';
	}
</script>

<div class={classes} class:position-absolute={true}>
	{#each $notifications as notification (notification.id)}
		<div
			class={`card m-1 opacity-50 ${typeToClass(notification.type)}`}
			transition:slide
			style="max-width: 24rem; min-width: 12rem;"
		>
			<div class="card-header d-flex">
				<strong class="me-auto">
					{notification.title}
				</strong>
				<button
					type="button"
					class="btn-close"
					class:btn-close-white={textLight[notification.type]}
					on:click={() => {
						removeNote(notification.id);
					}}
				/>
			</div>
			{#if notification.body}
				<div class="card-body">{notification.body} timeout = {notification.timeout}</div>
			{/if}
		</div>
	{/each}
</div>
