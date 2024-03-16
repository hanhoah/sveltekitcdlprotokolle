import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

inject({ mode: dev ? 'development' : 'production' });

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth')
  
	const supabase = createSupabaseLoadClient({
	  supabaseUrl: 'https://noejjknzqcfnwzgrpfdi.supabase.co',
	  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c',
	  event: { fetch },
	  serverSession: data.session,
	})
  
	const {
	  data: { session },
	} = await supabase.auth.getSession()
  
	return { supabase, session }
  }
  