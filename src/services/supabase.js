import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase Cloud
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase Client inicializado:', {
  url: supabaseUrl,
  connected: !!supabase
});
