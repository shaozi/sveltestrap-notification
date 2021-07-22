<script lang="ts">
	import Notifications from '$lib/Notifications.svelte';
	import { addNote } from '$lib/stores';
	let title = '';
	let body = '';
	let position = 'top-right';
	let possiblePositions = [
		'top-right',
		'top',
		'top-center',
		'top-left',
		'right',
		'bottom-right',
		'bottom-center',
		'bottom',
		'bottom-left',
		'left',
		'center'
	];
</script>

<div class="container">
	<h1>Notification Demo</h1>
	<input bind:value={title} placeholder="Title" />
	<input bind:value={body} placeholder="Body" />
	<button class="btn btn-primary" on:click={() => addNote(title, body)}> Add </button>
	{#each possiblePositions as p}
		<div>
			<label for={`radio-${p}`}>{p}</label>
			<input type="radio" name="position" id={`radio-${p}`} value={p} bind:group={position} />
		</div>
	{/each}

	<Notifications {position} />
</div>
