'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  MegaPhone, 
  Mail, 
  Search, 
  Copy, 
  Check,
  Zap,
  Facebook,
  Instagram,
  Target
} from 'lucide-react';
import { generateMarketingContent } from '@/lib/ai';

const MarketingEngine = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [targetCity, setTargetCity] = useState('');
  const [promotion, setPromotion] = useState('20% off for first-time mansion cleaning');

  const handleGenerate = async (type: 'ad' | 'email' | 'seo') => {
    setLoading(true);
    const context = {
      city: targetCity || 'San Francisco',
      promotion: promotion,
      usp: ['AI-driven pricing', 'Luxury standard', 'Google Guaranteed'],
      target: 'High-net-worth homeowners and busy professionals'
    };
    
    const content = await generateMarketingContent(type, context);
    setResult(content);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Sparkles className="text-primary" />
          AI Marketing Engine
        </h1>
        <p className="text-slate-500">Generate high-converting ads and emails optimized for local growth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <Card className="border-none shadow-sm rounded-3xl lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Campaign Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Target City / Area</Label>
              <Input 
                placeholder="e.g. Palo Alto, CA" 
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Promotion / Offer</Label>
              <Textarea 
                placeholder="What are we promoting?" 
                className="h-24"
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
              />
            </div>
            
            <div className="pt-4 space-y-3">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generate Content</Label>
              <Button 
                onClick={() => handleGenerate('ad')} 
                disabled={loading}
                className="w-full justify-start gap-3 h-12 rounded-xl"
              >
                <MegaPhone className="w-4 h-4" /> Facebook / Instagram Ad
              </Button>
              <Button 
                onClick={() => handleGenerate('email')} 
                disabled={loading}
                variant="outline" 
                className="w-full justify-start gap-3 h-12 rounded-xl bg-white"
              >
                <Mail className="w-4 h-4" /> Email Nurturing Sequence
              </Button>
              <Button 
                onClick={() => handleGenerate('seo')} 
                disabled={loading}
                variant="outline" 
                className="w-full justify-start gap-3 h-12 rounded-xl bg-white"
              >
                <Search className="w-4 h-4" /> Local SEO Copy (City Page)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={copyToClipboard}
              disabled={!result}
            >
              {copied ? <Check className="text-emerald-500" /> : <Copy className="text-slate-400" />}
            </Button>
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-bold">AI Generated Result</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium">NexaAI is crafting your copy...</p>
              </div>
            ) : result ? (
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 bg-slate-100 p-8 rounded-2xl border border-slate-200">
                  {result}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                <Target className="w-16 h-16 mb-4" />
                <p>Configure your campaign and hit generate to see the magic.</p>
              </div>
            )}
          </CardContent>
          {result && (
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="text-primary w-5 h-5" />
                <span className="text-sm font-bold">Performance Prediction: High Quality (9.2/10)</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  Refine Tone
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Publish Now
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MarketingEngine;
