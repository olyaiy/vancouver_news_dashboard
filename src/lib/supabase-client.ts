import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Service Role Key


export const supabase = createClient(supabaseUrl, supabaseKey);
