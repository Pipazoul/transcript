<script lang="ts">
	import { currentUser } from '$lib/store';
	import { sendVerificationEmail } from '$lib/utils/auth';

	let verificationSent = false;
	function send() {
		sendVerificationEmail($currentUser.email);
		verificationSent = true;
	}
</script>

<section>
	{#if  $currentUser?.id && !$currentUser?.verified}
		<div
			class="bg-blue-100 border rounded-md m-4 border-blue-500 text-blue-700 px-4 py-3"
			role="alert"
		>
			{#if !verificationSent}
				<p class="font-bold">Veuillez vérifier votre adresse email</p>
				<p class="text-sm">Un email de vérification vous a été envoyé</p>
				<p class="text-sm">Vous n'avez pas reçu l'email ?</p>

				<button class="text-sm underline cursor-pointer" on:click={send}> Renvoyer l'email </button>
			{:else}
				<p class="text-sm">Un email a été renvoyé.</p>
				<p class="text-sm bold">Pensez a verifier dans vos spams</p>
			{/if}
		</div>
	{/if}
</section>