<script lang="ts">
	import Upgrade from '$lib/components/account/Upgrade.svelte';
	import Usage from '$lib/components/account/Usage.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Card from "$lib/components/ui/card/index.js";
	import Title from '$lib/components/utils/Title.svelte';
	import { currentUser } from '$lib/store';
</script>

<section class="flex flex-col justify-center">
	<Title text="Account" />
	<div class="flex flex-wrap">
		<div class="w-full md:w-1/2 p-4">
			<Card.Root>
				<Card.Header>
					<Card.Title>Subscription</Card.Title>
					<Card.Description>Manage your subscriptions settings</Card.Description>
						<Usage duration={$currentUser?.duration}/>
						<Upgrade/>
						<Button variant="destructive">Unsubscribe</Button>
				  </Card.Header>
				  <Card.Content>
				</Card.Content>
			  </Card.Root>
		</div>
		<div class="w-full md:w-1/2 p-4">
			<Card.Root>
				<Card.Header>
					<Card.Title>Account</Card.Title>
					<Card.Description>Update your account settings</Card.Description>
					<Button>Update email</Button>
					<Button>Update password</Button>
					<h2 class="text-2xl">Danger Zone</h2>
					<Button variant="destructive">Delete my account</Button>
				  </Card.Header>
				  <Card.Content>
				</Card.Content>
			  </Card.Root>
		</div>
	</div>

</section>
