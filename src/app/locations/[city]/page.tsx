import React from 'react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import EstimateCalculator from '@/components/marketing/EstimateCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, ShieldCheck, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  // In production, this would fetch from Supabase
  const cities = ['palo-alto', 'san-francisco', 'los-angeles', 'miami', 'new-york'];
  return cities.map((city) => ({
    city: city,
  }));
}

const CityPage = ({ params }: { params: { city: string } }) => {
  const cityName = params.city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Localized Hero */}
      <section className="pt-32 pb-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-8">
            <MapPin className="w-4 h-4" />
            Luxury Cleaning in {cityName}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
            The #1 Rated Cleaning<br />Service in <span className="text-primary">{cityName}</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Professional, AI-optimized cleaning services tailored for the homes and businesses of {cityName}. Experience the NexaSphere difference.
          </p>
          <div className="flex justify-center gap-8 mb-16">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="flex text-yellow-400"><Star className="fill-current w-4" /><Star className="fill-current w-4" /><Star className="fill-current w-4" /><Star className="fill-current w-4" /><Star className="fill-current w-4" /></div>
              <div className="text-xs text-slate-400">500+ Google Reviews</div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm font-bold text-emerald-500 uppercase tracking-tighter">Guaranteed</div>
              <div className="text-xs text-slate-400">Happiness Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Why {cityName} Trusts NexaSphere Clean</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We understand the high standards of residents in {cityName}. Whether you live in a luxury estate, a modern apartment, or run a high-traffic commercial space, our team is equipped with the tools and training to deliver perfection.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Local Professionals', icon: <Users className="text-primary" /> },
                  { title: 'Zip-Code Pricing', icon: <Zap className="text-primary" /> },
                  { title: 'Eco-Friendly', icon: <Sparkles className="text-primary" /> },
                  { title: 'Insured & Bonded', icon: <ShieldCheck className="text-primary" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <span className="font-bold text-slate-800">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000" 
                  alt={`${cityName} House Cleaning`}
                  className="w-full h-[400px] object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <EstimateCalculator />

      <Footer />
    </main>
  );
};

import { Users, Zap } from 'lucide-react';

export default CityPage;
