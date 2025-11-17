import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Console log to debug if supabase client is created
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase key exists:', !!supabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey)

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  console.log('Supabase session test:', data?.session ? 'Authenticated' : 'No session', error)
})
