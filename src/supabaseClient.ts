import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// 🔍 DEBUG - À retirer après
console.log("🔍 supabaseUrl:", supabaseUrl ? "✅ OK" : "❌ MISSING");
console.log("🔍 supabaseAnonKey:", supabaseAnonKey ? "✅ OK" : "❌ MISSING");
console.log("🔍 All env vars:", import.meta.env);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ERROR: Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "implicit",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
};