<script lang="ts">
	import { notifications, removeNote } from '$lib/stores';
	import { Toast, ToastBody, ToastHeader } from 'sveltestrap';

	import { slide } from 'svelte/transition';

	let className = '';
	export { className as class };
	export let position:
		| 'top-left'
		| 'top'
		| 'top-center'
		| 'top-right'
		| 'left'
		| 'right'
		| 'center'
		| 'bottom-left'
		| 'bottom'
		| 'bottom-center'
		| 'bottom-right' = 'top-right';
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
		case 'top-left':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'top-0',
				'start-0'
			);
			break;
		case 'top-center':
		case 'top':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'top-0',
				'start-50',
				'translate-middle-x'
			);
			break;
		case 'left':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'top-50',
				'start-0',
				'translate-middle-y'
			);
			break;
		case 'right':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'top-50',
				'end-0',
				'translate-middle-y'
			);
			break;
		case 'center':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'top-50',
				'start-50',
				'translate-middle'
			);
			break;
		case 'bottom-left':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'bottom-0',
				'start-0'
			);
			break;
		case 'bottom-center':
		case 'bottom':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'bottom-0',
				'start-50',
				'translate-middle-x'
			);
			break;
		case 'bottom-right':
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'bottom-0',
				'end-0'
			);
			break;
		case 'top-right':
		default:
			classes = classnames(
				className,
				'toast-container',
				'position-absolute',
				'p-3',
				'top-0',
				'end-0'
			);
			break;
	}
</script>

<div class={classes}>
	{#each $notifications as notification (notification.id)}
		<div transition:slide>
			<Toast class="me-1">
				<ToastHeader toggle={() => removeNote(notification.id)}>
					{notification.title}
				</ToastHeader>
				<ToastBody>{notification.body}</ToastBody>
			</Toast>
		</div>
	{/each}
</div>
