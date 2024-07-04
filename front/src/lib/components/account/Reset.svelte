<script lang="ts">
	import { page } from '$app/stores';
	import VerifyPassword from '$lib/components/account/VerifyPassword.svelte';
	import Title from '$lib/components/misc/Title.svelte';
	import { confirmPasswordReset, sendPasswordResetEmail } from '$lib/utils/auth';
	import { checkPassword } from '$lib/utils/misc';

	let token = $page.url.searchParams.get('token') || '';
    let password = '';
    let passwordConfirm = '';
    let email = '';
    async function reset() {
        const isPasswordValid = await checkPassword(password, passwordConfirm);
        if (isPasswordValid){
            await confirmPasswordReset(token, password, passwordConfirm);
        }
    }
    async function send() {
        await sendPasswordResetEmail(email);
        email = '';
    }

</script>
<section class="flex flex-col items-center p-4">
    <Title text="Reinitialisation du mot de passe" />
    {#if $page.url.searchParams.get('token') == null}
        <p class="mt-2 mb-2">Entrez votre adresse email pour recevoir un lien de reinitialisation</p>
        <input type="text" placeholder="Your email here" class="input input-bordered w-full max-w-xs" bind:value={email} />
        <button
            type="submit"
            class="btn btn-primary mt-4"
            on:click={async () => {
                await send();
            }}>Envoyer
        </button>
    {:else}
        <p>Entrez votre nouveau mot de passe</p>
        <div class="flex mt-4">
            <VerifyPassword bind:password bind:passwordConfirm />
        </div>
        <button
            type="submit"
            class="btn btn-primary mt-4"
            on:click={async () => {
                await reset();
            }}>Soumettre
        </button>
    {/if}        
</section>
