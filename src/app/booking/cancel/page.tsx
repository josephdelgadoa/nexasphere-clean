import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Booking Cancelled</h1>
        <p className="text-slate-600 mb-8">
          Your booking process was interrupted. Don't worry, no charges were made. Feel free to try again when you're ready.
        </p>

        <Link href="/#estimate">
          <Button className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 group gap-3">
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>
        </Link>
        
        <Link href="/" className="inline-block mt-6 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
