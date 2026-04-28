import React from 'react';
import Link from 'next/link';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Booking Confirmed!</h1>
        <p className="text-slate-600 mb-8">
          Thank you for choosing NexaSphere Clean. Your deposit has been received and your slot is secured. Check your email for full details.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-left border border-slate-100">
            <Calendar className="text-primary w-6 h-6" />
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Step</div>
              <div className="font-bold text-slate-900">Add to your calendar</div>
            </div>
          </div>
        </div>

        <Link href="/dashboard">
          <Button className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 group">
            Go to Dashboard
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
