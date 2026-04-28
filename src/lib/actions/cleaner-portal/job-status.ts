'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function checkInToJob(appointmentId: string) {
  const supabase = createClient();
  
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
  const supabase = createClient();
  
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
