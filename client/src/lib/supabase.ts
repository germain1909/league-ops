import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl) && Boolean(supabaseKey);

// Fall back to placeholder values so createClient doesn't throw at import time
// when env vars are missing — isSupabaseConfigured is what callers should check.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder-key"
);


//this file used to create a supabase client instance that can be 
// used throughout the application. It imports the createClient function from 
// the @supabase/supabase-js package and uses environment variables 
// to configure the client. The isSupabaseConfigured variable checks 
// if the necessary environment variables are present, and if not, 
// it falls back to placeholder values to prevent errors during import.