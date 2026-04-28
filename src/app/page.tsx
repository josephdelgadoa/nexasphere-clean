import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import EstimateCalculator from '@/components/marketing/EstimateCalculator';
import Footer from '@/components/marketing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Home as HomeIcon, 
  Building2, 
  Zap,
  Star
} from 'lucide-react';

const services = [
  {
    title: 'Residential Cleaning',
    description: 'Our signature thorough cleaning for your home. We cover every corner, ensuring a pristine living environment.',
    icon: <HomeIcon className="w-8 h-8" />,
    features: ['Dusting & Polishing', 'Vacuuming & Mopping', 'Kitchen & Bath Sanitize']
  },
  {
    title: 'Luxury Mansion Care',
    description: 'Specialized white-glove service for high-end properties and estates requiring meticulous attention.',
    icon: <Sparkles className="w-8 h-8" />,
    features: ['Delicate Surface Care', 'Chandelier Cleaning', 'Art & Antique Dusting']
  },
  {
    title: 'Light Commercial',
    description: 'Elevate your office or retail space with professional cleaning that leaves a lasting impression on clients.',
    icon: <Building2 className="w-8 h-8" />,
    features: ['Common Area Sanitize', 'Waste Management', 'Breakroom Deep Clean']
  },
  {
    title: 'Post-Construction',
    description: 'Comprehensive cleanup to remove dust and debris after renovation or new builds.',
    icon: <Zap className="w-8 h-8" />,
    features: ['Fine Dust Removal', 'Window & Track Cleaning', 'Surface Detailing']
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">World-Class Cleaning Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Tailored cleaning solutions designed to fit your lifestyle and exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="group border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why NexaSphere Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                The NexaSphere<br />
                <span className="text-primary">Difference</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Google Guaranteed & Insured</h4>
                    <p className="text-slate-400">Rest easy knowing every booking is backed by our $2M insurance policy and professional background checks.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Real-Time Availability</h4>
                    <p className="text-slate-400">No more waiting for quotes. See live availability and book your appointment in under 60 seconds.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Happiness Guarantee</h4>
                    <p className="text-slate-400">If you're not 100% satisfied, we'll come back and re-clean any area for free within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-square bg-slate-800 rounded-[3rem] p-12 flex flex-col justify-center border border-white/5 relative">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full blur-[80px] opacity-20" />
                  <div className="text-6xl font-black text-primary mb-2">5,000+</div>
                  <div className="text-2xl font-bold mb-8 text-white">Five-Star Cleanings Completed</div>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    "NexaSphere has completely changed the way I manage my home. Their attention to detail in our mansion is simply unparalleled. Truly a luxury service."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-700" />
                    <div>
                      <div className="font-bold">Sarah J. Miller</div>
                      <div className="text-slate-500 text-sm">Estate Owner, Palo Alto</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <EstimateCalculator />

      <Footer />
    </main>
  );
}
