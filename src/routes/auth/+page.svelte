<script>
	import { fail } from '@sveltejs/kit';
  import { Button } from 'flowbite-svelte';
  import { redirect } from '@sveltejs/kit';
    export let data
    let { supabase } = data
    $: ({ supabase } = data)
  
    let email
    let password
    let session = data.session

    console.log('client session: ', session);
  
    const handleSignUp = async () => {
      await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
    }
  
    const handleSignIn = async () => {
      console.log('logging you in');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if(error){
        console.log('There was an error logging you in. ');
        fail(400)
        return false
      }
      else{
        console.log('logged in');
        await redirect(303, '/admin')

      }
    }
  
    const handleSignOut = async () => {
      console.log('logging you out');
      const { data, error } = await supabase.auth.signOut()
      console.log('logging out data ist ', data);
      console.log('error ', error);
      console.log('logged out');
    }


  </script>

  <div id="page" class="bg-gray-100 h-96 justify-center flex flex-col">
    
    {#if !session}
    
    <form class="bg-white flex flex-col w-60 items-center m-auto mt-10 p-5 rounded-xl space-y-5" on:submit="{handleSignUp}">
      <input class="h-10 bg-white border-2 border-gray-300 w-full text-center" placeholder="Email" name="email" bind:value="{email}" />
      <input class="h-10 w-full border-2 border-gray-300 text-center" type="password" placeholder="Password" name="password" bind:value="{password}" />
      <Button on:click="{handleSignIn}" color="green">Log In</Button>
    </form>

      <div class="m-auto">
        <h2 >No Account? Please Sign Up</h2>
        <Button color="green" class="w-28" on:click="{handleSignUp}">Sign Up</Button>
      </div>
      {:else}
      <Button class="w-28 m-auto" on:click="{handleSignOut}">Sign out</Button>
      {/if}


  </div>
