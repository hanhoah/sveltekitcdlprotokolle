import { createClient } from '@supabase/supabase-js';

let supabase;

if (process.env.NODE_ENV === 'production') {
  // Konfiguration für die Produktionsumgebung
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
} else {
  // Konfiguration für die lokale Entwicklungsumgebung
  supabase = createClient(
    import.meta.env.VITE_SUPABASE_LOCAL_URL,
    import.meta.env.VITE_SUPABASE_LOCAL_KEY
  );
}

export default supabase;