<script>
    import { goto } from '$app/navigation';
    import supabase from '$lib/supabaseClient';

    async function getSession(){
        console.log('BEFORE getSession');
        const { data, error } = await supabase.auth.getSession()
        console.log('after get Session');
        return data
    }

    async function getUser(){
        console.log('before getUser');
        const { data: { user } } = await supabase.auth.getUser()
        console.log('after getUser');
        return user
    }

    async function signinUser(){
        console.log('Signing in User');
        const { data, error } = await supabase.auth.signInWithPassword({
        email: 'hanniboy@gmail.com',
        password: '291276168',
        })
        console.log('sign in user data ', data);
        console.log('sign in user error ', error);
    }

    console.log('now signing in user');
    signinUser().then(getSession)

    console.log('now getting user');
    let user = getUser()

    console.log('now getting session. ');
    let session = getSession()

    console.log('session is ', session);
    console.log('user is ', user);


    // Überprüfen Sie den Authentifizierungsstatus des Benutzers
    const isAuthenticated = supabase.auth.getSession() !== null;
    console.log('Authenticated is ', isAuthenticated);

    // Wenn der Benutzer nicht angemeldet ist, leiten Sie ihn zur Anmeldeseite um
    if (!isAuthenticated) {
        goto('/login');
    }
</script>

{#if isAuthenticated}
    <!-- Inhalte der Administrationsseite -->
    <h1>Willkommen zur Admin-Seite</h1>
    <!-- Hier den Inhalt Ihrer Administrationsseite einfügen -->
{:else}
    <!-- Wenn der Benutzer nicht angemeldet ist, leiten Sie ihn zur Anmeldeseite um -->
    <p>Du musst angemeldet sein, um auf diese Seite zuzugreifen. Bitte melde dich an.</p>
{/if}
