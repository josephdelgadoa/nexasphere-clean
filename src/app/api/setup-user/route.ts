import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const email = 'josephdelgadoa@gmail.com';
  const password = 'abc123';

  try {
    let targetUser: any = null;

    // 1. Create or Update user in Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
         const { data: users } = await supabase.auth.admin.listUsers();
         const existingUser = users.users.find(u => u.email === email);
         if (existingUser) {
            targetUser = existingUser;
            await supabase.auth.admin.updateUserById(existingUser.id, { 
              password,
              email_confirm: true 
            });
         }
      } else {
        return NextResponse.json({ error: authError.message }, { status: 400 });
      }
    } else {
      targetUser = authUser.user;
    }

    if (!targetUser) throw new Error('Failed to identify target user');

    // 2. Set role to admin in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ 
        id: targetUser.id,
        email: email, 
        role: 'admin',
        full_name: 'Joseph Delgado'
      }, { onConflict: 'id' });

    if (profileError) {
      return NextResponse.json({ error: `Profile error: ${profileError.message}` }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `User ${email} has been successfully configured as an ADMIN.`,
      credentials: {
        email,
        password
      }
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
