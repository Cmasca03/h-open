// src/utils/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // getAll debe ser async porque cookies() es Promise en algunos contextos
        async getAll() {
          return (await cookieStore).getAll();
        },
        // setAll también async
        async setAll(cookiesToSet) {
          const store = await cookieStore;
          cookiesToSet.forEach(({ name, value, options }) => {
            store.set(name, value, options);
          });
        },
      },
    }
  );
}