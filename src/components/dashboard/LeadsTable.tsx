'use client';

import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Mail, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const LeadsTable = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        properties (*)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeads(data);
    }
    setLoading(false);
  };

  if (loading) return <div className="py-10 text-center text-slate-500">Loading leads...</div>;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-bold">Customer / Property</TableHead>
            <TableHead className="font-bold">Service</TableHead>
            <TableHead className="font-bold">Estimate</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="text-right font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-slate-400">
                No leads found yet.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors">
                <TableCell>
                  <div className="font-bold text-slate-900 capitalize">
                    {lead.properties?.property_type} • {lead.properties?.sq_ft} sq ft
                  </div>
                  <div className="text-xs text-slate-500">{lead.properties?.zip_code}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-slate-50 capitalize">
                    {lead.service_id ? 'Standard Cleaning' : 'Standard'}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-slate-900">${lead.estimated_price}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "capitalize",
                    lead.status === 'draft' ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
                  )}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Mail className="w-4 h-4 text-primary" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsTable;
