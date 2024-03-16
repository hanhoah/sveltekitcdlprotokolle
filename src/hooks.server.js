// src/hooks.server.js
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: 'https://noejjknzqcfnwzgrpfdi.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c',
    event,
  })

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}