<script lang="ts">
    import { login } from "$lib/utils/auth";
    let email: string = "";
    let password: string = "";
</script>

<section>
    <div class="flex flex-col items-center h-full justify-center">
        <!--Disable form redirect-->
        <form on:submit|preventDefault class="space-y-4">
            <h1>Connexion</h1>
            <div class="form-control w-full max-w-xs space-y-4">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <input type="text" placeholder="Votre Email" class="input input-bordered w-full max-w-xs" bind:value={email} />
                <input type="password" placeholder="Mot de passe" class="input input-bordered w-full max-w-xs" bind:value={password} />
                <button type="submit" class="btn btn-primary" on:click={login(email,password)} >Se connecter</button>
            </div>
        </form>
    </div>
</section>