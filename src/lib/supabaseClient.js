import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://noejjknzqcfnwzgrpfdi.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c'
);

export default supabase;
