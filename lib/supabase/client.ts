/**
 * SUPABASE CLIENT — Phase 2 placeholder
 *
 * В Phase 2 разкоментирай и инсталирай:
 *   npm install @supabase/supabase-js @supabase/ssr
 *
 * След това в queries.ts заменяме mock логиката с истински queries.
 *
 * Env vars които ще трябват:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY (само server-side, за admin операции)
 */

// import { createBrowserClient } from '@supabase/ssr';
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );
// }

// export function createServerSupabase() {
//   const cookieStore = cookies();
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get: (name) => cookieStore.get(name)?.value,
//         set: (name, value, options) => cookieStore.set({ name, value, ...options }),
//         remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
//       },
//     }
//   );
// }

export const SUPABASE_NOT_CONFIGURED = true;
