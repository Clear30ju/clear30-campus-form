import { supabase } from './supabase';

export async function submitForm(formData) {
  const submission = {
    ...formData,
    submitted_at: new Date().toISOString(),
  };

  // Don't .select() the inserted row — anon has INSERT only, not SELECT,
  // so asking for the row back would trip RLS.
  const { error } = await supabase
    .schema('schools')
    .from('campus_submissions')
    .insert({ submission });

  if (error) {
    throw new Error(error.message || 'Failed to submit form');
  }
}
