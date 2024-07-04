<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
	import Title from '$lib/components/misc/Title.svelte';
	import { notification } from '$lib/store';
	import { signup } from '$lib/utils/auth';

	let password: string;
	let passwordConfirm: string;
	let email: string;
	let username: string;


	async function register() {
		await signup(username, email, password, passwordConfirm);
	}
</script>

<section>
	<div class="flex flex-col items-center h-full justify-center">
		<!--Disable form redirect-->
		<form on:submit|preventDefault class="space-y-4">
			<Title text={'Inscription'} />
			<div class="form-control w-full max-w-xs space-y-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="flex items-center"
					><Fa icon={faUser} />
					<p class="ml-2">Nom utilisateur</p></label
				>
				<input
					type="text"
					placeholder="Votre Nom d'utilisateur"
					class="input input-bordered w-full max-w-xs"
					bind:value={username}
				/>
				<label class="flex items-center" for="email-input"
					><Fa icon={faEnvelope} />
					<p class="ml-2">Email</p></label
				>
				<input
					type="text"
					placeholder="Votre Email"
					class="input input-bordered w-full max-w-xs"
					bind:value={email}
					id="email-input"
				/>
				<input
					type="text"
					placeholder="Votre Email"
					class="input input-bordered w-full max-w-xs"
					bind:value={email}
				/>
				<label class="flex items-center"
					for="password-input"
					><Fa icon={faLock} />
					<p class="ml-2">Mot de passe</p></label
				>
				<input
					type="password"
					placeholder="Mot de passe"
					class="input input-bordered w-full max-w-xs"
					id="password-input"
					bind:value={password}
				/>
				<input
					type="password"
					placeholder="Confirmer le mot de passe"
					class="input input-bordered w-full max-w-xs"
					bind:value={passwordConfirm}
				/>

				
				<button
					type="submit"
					class="btn btn-primary"
					on:click={() => {
						register();
					}}>S'inscrire</button
				>
			</div>
		</form>
	</div>
</section>
