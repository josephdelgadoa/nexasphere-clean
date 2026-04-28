'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { scoreLead } from '@/lib/actions/lead-scoring';

export type BookingData = {
  propertyType: string;
  sqft: number;
  beds: number;
  baths: number;
  serviceType: string;
  frequency: string;
  addons: string[];
  zipCode: string;
};

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveQuote = async (data: BookingData, price: number) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Create property entry (anonymous for now or linked to user)
      const { data: property, error: propError } = await supabase
        .from('properties')
        .insert([{
          property_type: data.propertyType,
          sq_ft: data.sqft,
          beds: data.beds,
          baths: data.baths,
          zip_code: data.zipCode,
        }])
        .select()
        .single();

      if (propError) throw propError;

      // 2. Create quote entry
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert([{
          property_id: property.id,
          estimated_price: price,
          status: 'draft',
        }])
        .select()
        .single();

      if (quoteError) throw quoteError;

      // 3. Trigger lead scoring (async, don't wait for it to finish to return to UI)
      scoreLead(quote.id);

      return quote;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveQuote,
    loading,
    error
  };
};
