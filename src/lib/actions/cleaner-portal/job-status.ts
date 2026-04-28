'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function checkInToJob(appointmentId: string) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      check_in_at: new Date().toISOString(),
      status: 'in_progress'
    })
    .eq('id', appointmentId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  revalidatePath('/cleaner');
  revalidatePath(`/cleaner/jobs/${appointmentId}`);
  return data;
}

export async function checkOutFromJob(appointmentId: string, notes?: string) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      check_out_at: new Date().toISOString(),
      status: 'completed',
      notes: notes || ''
    })
    .eq('id', appointmentId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  revalidatePath('/cleaner');
  revalidatePath(`/cleaner/jobs/${appointmentId}`);
  return data;
}
