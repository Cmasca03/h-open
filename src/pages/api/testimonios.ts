import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerClient } from '@supabase/ssr';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
  });

  let user = null;

  // 1. Prioridad: token enviado en header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);
    if (!error && data.user) {
      user = data.user;
      console.log('Usuario autenticado vía token:', user.id);
    } else {
      console.error('Token inválido:', error);
    }
  }

  // 2. Fallback: sesión por cookies (si el token falla)
  if (!user) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      user = session.user;
      console.log('Usuario autenticado vía cookies:', user.id);
    }
  }

  if (!user) {
    console.error('No se encontró usuario autenticado');
    return res.status(401).json({ error: 'Debes iniciar sesión para compartir un testimonio.' });
  }

  const { content, visibility } = req.body;

  if (!content || !visibility) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const { data, error } = await supabase.from('testimonios').insert({
    content: content.trim(),
    visibility,
    user_id: user.id,
    approved: visibility === 'private' ? true : false,
  });

  if (error) {
    console.error('Error Supabase insert:', error);
    return res.status(400).json({ error: error.message });
  }

  console.log('Testimonio insertado con éxito:', data);
  return res.status(200).json({ success: true });
}