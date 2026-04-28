'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Play, 
  Camera, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { checkInToJob, checkOutFromJob } from '@/lib/actions/cleaner-portal/job-status';

const JobDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      // In a real app, we'd use the actual ID from params.id
      // await checkInToJob(params.id as string);
      setStatus('in_progress');
      toast.success('Job started! Timer is running.');
    } catch (err) {
      toast.error('Failed to start job');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // await checkOutFromJob(params.id as string);
      setStatus('completed');
      toast.success('Job completed successfully!');
      setTimeout(() => router.push('/cleaner'), 2000);
    } catch (err) {
      toast.error('Failed to complete job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 pt-12 pb-8 sticky top-0 z-20">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Schedule
        </button>
        <div className="flex justify-between items-start">
          <div>
            <Badge className="bg-primary/20 text-primary border-none mb-2 px-3 py-1 font-bold">
              Mansion Deep Clean
            </Badge>
            <h1 className="text-2xl font-black">Sarah Miller's Residence</h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black">$120.00</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Est. Payout</div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden mb-6">
          <CardContent className="p-0">
            <div className="p-8 bg-white space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">142 Luxury Lane</div>
                  <div className="text-sm text-slate-500">Palo Alto, CA 94301</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">2:00 PM - 6:00 PM</div>
                  <div className="text-sm text-slate-500">Scheduled Duration: 4 Hours</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" /> Special Instructions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "Please pay extra attention to the master bathroom marble. Use the green bottle labeled 'Eco-Stone'. The side gate code is 4421."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Job Checklist</h3>
          <div className="space-y-3">
            {[
              'Dust all ceiling fans and fixtures',
              'Polish kitchen marble surfaces',
              'Vacuum master bedroom & rug',
              'Sanitize all bathrooms',
              'Take completion photos'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100">
                <div className="w-6 h-6 rounded-md border-2 border-slate-200 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-100" />
                </div>
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Upload Placeholder */}
        <div className="mb-10">
          <Button variant="outline" className="w-full h-16 rounded-2xl border-dashed border-2 text-slate-500 flex flex-col gap-1 hover:border-primary hover:text-primary transition-all">
            <Camera className="w-6 h-6" />
            <span className="text-xs font-bold uppercase">Add Completion Photos</span>
          </Button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-6 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {status === 'pending' && (
          <Button 
            onClick={handleStart}
            disabled={loading}
            className="w-full h-14 rounded-2xl text-lg font-black bg-slate-900 shadow-xl shadow-slate-200 group"
          >
            {loading ? 'Starting...' : 'Start Job'}
            <Play className="ml-2 w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
        {status === 'in_progress' && (
          <Button 
            onClick={handleComplete}
            disabled={loading}
            className="w-full h-14 rounded-2xl text-lg font-black bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-200 group"
          >
            {loading ? 'Processing...' : 'Complete Job'}
            <CheckCircle2 className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
          </Button>
        )}
        {status === 'completed' && (
          <Button 
            disabled
            className="w-full h-14 rounded-2xl text-lg font-black bg-slate-200 text-slate-500 border-none"
          >
            Job Completed <CheckCircle2 className="ml-2 w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
