import { createClient } from "@supabase/supabase-js";

// ✅ Essayer d'abord import.meta.env, puis process.env (Vercel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                     (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : '');
                     
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                         (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : '');

// 🔍 DEBUG - À retirer après
console.log("🔍 supabaseUrl:", supabaseUrl ? "✅ OK" : "❌ MISSING");
console.log("🔍 supabaseAnonKey:", supabaseAnonKey ? "✅ OK" : "❌ MISSING");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ERROR: Missing Supabase environment variables");
  throw new Error("Supabase configuration is missing. Check your environment variables.");
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