// src/pages/api/testimonios.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerClient } from '@supabase/ssr';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map(name => ({
            name,
            value: req.cookies[name] || '',
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.setHeader('Set-Cookie', `${name}=${value}; ${Object.entries(options || {}).map(([k, v]) => `${k}=${v}`).join('; ')}`);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Debes iniciar sesión' });
  }

  const { content, visibility } = req.body;

  if (!content || !visibility) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const { data, error } = await supabase.from('testimonios').insert({
    content: content.trim(),
    visibility,
    user_id: session.user.id,
    approved: visibility === 'private' ? true : false,
  });

  if (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}