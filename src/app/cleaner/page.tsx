'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const CleanerDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Hey, Marcus 👋</h1>
            <p className="text-sm text-slate-500 font-medium">Ready for 3 jobs today?</p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <Bell className="w-5 h-5" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Today's Earnings</div>
            <div className="text-xl font-black text-emerald-900">$245.50</div>
          </div>
          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Next Start</div>
            <div className="text-xl font-black text-slate-900">2:00 PM</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 p-6">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all",
            activeTab === 'upcoming' ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-500"
          )}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all",
            activeTab === 'completed' ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-500"
          )}
        >
          Completed
        </button>
      </div>

      {/* Job Cards */}
      <div className="px-6 space-y-4">
        {[
          {
            id: '1',
            client: 'Sarah Miller',
            type: 'Mansion Deep Clean',
            address: '142 Luxury Lane, Palo Alto',
            time: '2:00 PM - 6:00 PM',
            payout: '$120.00',
            status: 'Upcoming'
          },
          {
            id: '2',
            client: 'TechHub Offices',
            type: 'Commercial Standard',
            address: '900 Innovation Way, Menlo Park',
            time: '7:00 PM - 9:30 PM',
            payout: '$85.00',
            status: 'Upcoming'
          }
        ].map((job) => (
          <Card key={job.id} className="border-none shadow-sm rounded-[2rem] overflow-hidden group active:scale-95 transition-transform">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 mb-2 capitalize">
                    {job.type}
                  </Badge>
                  <h3 className="text-lg font-bold text-slate-900">{job.client}</h3>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">{job.payout}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payout</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-500">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{job.address}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{job.time}</span>
                </div>
              </div>

              <Button className="w-full h-12 rounded-xl font-bold bg-slate-900 hover:bg-primary transition-colors">
                View Job Details <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Nav (PWA style) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center z-50">
        <div className="flex flex-col items-center gap-1 text-primary">
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Schedule</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <DollarSign className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Earnings</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <Sparkles className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default CleanerDashboard;
