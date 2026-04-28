'use client';

import React from 'react';
export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Users, 
  Calendar as CalendarIcon, 
  DollarSign,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import LeadsTable from '@/components/dashboard/LeadsTable';

const data = [
  { name: 'Mon', revenue: 4000, bookings: 24 },
  { name: 'Tue', revenue: 3000, bookings: 18 },
  { name: 'Wed', revenue: 2000, bookings: 12 },
  { name: 'Thu', revenue: 2780, bookings: 15 },
  { name: 'Fri', revenue: 1890, bookings: 10 },
  { name: 'Sat', revenue: 2390, bookings: 14 },
  { name: 'Sun', revenue: 3490, bookings: 21 },
];

const stats = [
  { title: 'Total Revenue', value: '$24,500', icon: <DollarSign className="text-emerald-500" />, change: '+12.5%' },
  { title: 'New Leads', value: '148', icon: <Users className="text-blue-500" />, change: '+8.2%' },
  { title: 'Bookings', value: '42', icon: <CalendarIcon className="text-purple-500" />, change: '+15.3%' },
  { title: 'Conversion Rate', value: '28.4%', icon: <TrendingUp className="text-orange-500" />, change: '+2.1%' },
];

const Dashboard = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Welcome back, NexaSphere Team.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
            Download Report
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
            + New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
                <div className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                  {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <CardTitle className="text-lg font-bold">Revenue Performance</CardTitle>
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="revenue" fill="oklch(0.697 0.143 160.33)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">Upcoming Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Sarah Miller', type: 'Mansion Deep Clean', time: 'Today, 2:00 PM', status: 'Pending' },
                { name: 'John Smith', type: 'Residential Standard', time: 'Tomorrow, 9:00 AM', status: 'Confirmed' },
                { name: 'Palo Alto Labs', type: 'Light Commercial', time: 'Wed, 6:00 PM', status: 'Confirmed' },
              ].map((job, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                      {job.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{job.name}</div>
                      <div className="text-xs text-slate-500">{job.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{job.time}</div>
                    <div className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      job.status === 'Confirmed' ? "text-emerald-500" : "text-orange-500"
                    )}>{job.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
              View Calendar
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              AI Revenue Forecast (Next 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Week 1', revenue: 12000 },
                  { name: 'Week 2', revenue: 15000 },
                  { name: 'Week 3', revenue: 18500 },
                  { name: 'Week 4', revenue: 22000 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="oklch(0.697 0.143 160.33)" strokeWidth={4} dot={{ r: 6, fill: 'white', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Marketing Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: 'Google LSA', leads: 42, conversion: '32%' },
                { source: 'Facebook Local', leads: 28, conversion: '18%' },
                { source: 'Yelp', leads: 15, conversion: '12%' },
                { source: 'Craigslist', leads: 12, conversion: '8%' },
              ].map((src, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="font-bold text-sm text-slate-900">{src.source}</div>
                  <div className="flex gap-4 text-xs font-medium text-slate-500">
                    <span>{src.leads} Leads</span>
                    <span className="text-emerald-600">{src.conversion} Conv.</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Quotes & Leads</h2>
        <LeadsTable />
      </div>
    </div>
  );
};

export default Dashboard;
