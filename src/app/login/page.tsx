'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-slate-900">
            NexaSphere<span className="text-primary">Clean</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-slate-900 text-white text-center py-10">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400">Sign in to your NexaSphere portal</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-12 rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" />
                </div>
              </div>

              <Button className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 group">
                Sign In
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Portal Quick Access</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-slate-600 border-slate-100 hover:bg-slate-50">
                    Admin Panel
                  </Button>
                </Link>
                <Link href="/cleaner">
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-slate-600 border-slate-100 hover:bg-slate-50">
                    Cleaner Portal
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
