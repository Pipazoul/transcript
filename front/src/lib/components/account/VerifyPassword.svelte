<script lang="ts">
    import Fa from 'svelte-fa';
	import {faLock} from '@fortawesome/free-solid-svg-icons';
	import PasswordStrength from '$lib/components/PasswordStrength.svelte';

    export let password: string;
    export let passwordConfirm: string;

</script>
<section>
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
    <PasswordStrength {password} />
</section>