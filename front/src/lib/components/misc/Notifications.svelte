<script lang="ts">
	import { notification } from '$lib/store';
	export const message: string = 'Message par defaut';
	export const type: string = 'success';

	$: if ($notification.show) {
		setTimeout(() => {
			$notification.show = false;
		}, 3000);
	}
</script>

<section>
	{#if $notification.show}
		<div class="p-4">
			<div class="alert text-white {$notification.type} shadow-lg">
				<div>
					<span>{$notification.body}</span>
				</div>
			</div>
		</div>
	{/if}
</section>