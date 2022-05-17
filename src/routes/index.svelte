<script lang="ts">
	import Notifications from '$lib/Notifications.svelte';
	import { notify } from '$lib/stores';
	import { Position } from '$lib/types';
	let title = '';
	let body = '';
	let timeout = 5;
	let type = '';
	let position = Position.TopRight;
	let possiblePositions = [
		Position.TopLeft,
		Position.Top,
		Position.TopCenter,
		Position.TopRight,
		Position.Left,
		Position.Center,
		Position.Right,
		Position.BottomLeft,
		Position.BottomCenter,
		Position.Bottom,
		Position.BottomRight
	];
	const positionLabels = {
		[Position.TopLeft]: 'Top left',
		[Position.Top]: 'Top',
		[Position.TopCenter]: 'Top center',
		[Position.TopRight]: 'Top right',
		[Position.Left]: 'Left',
		[Position.Center]: 'Center',
		[Position.Right]: 'Right',
		[Position.BottomLeft]: 'Bottom left',
		[Position.BottomCenter]: 'Bottom center',
		[Position.Bottom]: 'Bottom',
		[Position.BottomRight]: 'Bottom right'
	};
</script>

<div class="container">
	<h1>Notification Demo</h1>
	<input bind:value={title} placeholder="Title" />
	<input bind:value={body} placeholder="Body" />
	<input bind:value={timeout} placeholder="Time out" />
	<input bind:value={type} placeholder="color" />
	<div>
		<button class="btn btn-primary" on:click={() => notify({ title, body, timeout, type })}>
			Add
		</button>
	</div>

	{#each possiblePositions as p}
		<div>
			<label for={`radio-${p}`}>{positionLabels[p]}</label>
			<input type="radio" name="position" id={`radio-${p}`} value={p} bind:group={position} />
		</div>
	{/each}
</div>

<Notifications {position} />
