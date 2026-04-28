'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Home, 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles,
  Zap,
  Calendar,
  Layers,
  Wind,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBooking } from '@/hooks/use-booking/use-booking';
import { toast } from 'sonner';

const steps = [
  { id: 'property', title: 'Property Details' },
  { id: 'service', title: 'Service Type' },
  { id: 'addons', title: 'Add-ons' },
  { id: 'result', title: 'Your Estimate' },
];

const EstimateCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyType: 'house',
    sqft: 1500,
    beds: 2,
    baths: 2,
    serviceType: 'standard',
    frequency: 'one-time',
    addons: [] as string[],
    zipCode: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const calculateEstimate = () => {
    let base = 50;
    const roomCost = (formData.beds * 30) + (formData.baths * 20);
    const sqftCost = formData.sqft * 0.15;
    
    let multiplier = 1.0;
    if (formData.serviceType === 'deep') multiplier = 1.5;
    if (formData.serviceType === 'move') multiplier = 1.8;
    if (formData.propertyType === 'mansion') multiplier = 2.5;
    if (formData.propertyType === 'commercial') multiplier = 2.0;

    let addonCost = formData.addons.length * 35; // Flat average for now
    
    const total = (base + roomCost + sqftCost + addonCost) * multiplier;
    
    let discount = 0;
    if (formData.frequency === 'weekly') discount = 0.20;
    if (formData.frequency === 'biweekly') discount = 0.15;
    if (formData.frequency === 'monthly') discount = 0.10;

    return {
      price: total * (1 - discount),
      duration: Math.ceil(total / 40) + 1, // Rough estimate: 1 hour per $40
      teamSize: total > 200 ? 2 : 1
    };
  };

  const estimate = calculateEstimate();

  const toggleAddon = (id: string) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.includes(id) 
        ? prev.addons.filter(a => a !== id) 
        : [...prev.addons, id]
    }));
  };

  const { saveQuote, loading: saving } = useBooking();

  const handleSecureBooking = async () => {
    toast.info('Saving your personalized quote...');
    const res = await saveQuote(formData, estimate.price);
    
    if (res) {
      toast.success('Quote saved! Redirecting to secure payment...');
      try {
        const stripeRes = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: estimate.price,
            serviceName: `${formData.serviceType} Cleaning`,
            quoteId: res.id,
          }),
        });
        
        const { id, error } = await stripeRes.json();
        if (error) throw new Error(error);
        
        console.log('Stripe Session ID:', id);
        toast.success('Redirecting to Stripe...');
      } catch (err: any) {
        toast.error('Payment initialization failed: ' + err.message);
      }
    } else {
      toast.error('Failed to save quote. Please try again.');
    }
  };

  return (
    <section id="estimate" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Intelligent Pricing Engine</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get a precise estimate in seconds. Our AI-driven calculator considers every detail of your space to provide transparent, competitive pricing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="flex justify-between mb-8 px-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  idx <= currentStep ? "bg-primary border-primary text-white" : "bg-white border-slate-200 text-slate-400"
                )}>
                  {idx < currentStep ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={cn("text-xs font-bold uppercase tracking-wider", idx <= currentStep ? "text-primary" : "text-slate-400")}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <Card className="border-none shadow-2xl overflow-hidden rounded-[2rem]">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Main Form Area */}
                <div className="flex-1 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {['house', 'apartment', 'mansion', 'commercial'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setFormData({ ...formData, propertyType: type })}
                              className={cn(
                                "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                                formData.propertyType === type 
                                  ? "border-primary bg-primary/5 text-primary" 
                                  : "border-slate-100 hover:border-primary/50 text-slate-500"
                              )}
                            >
                              {type === 'house' && <Home />}
                              {type === 'apartment' && <Building2 />}
                              {type === 'mansion' && <Sparkles />}
                              {type === 'commercial' && <Zap />}
                              <span className="text-sm font-bold capitalize">{type}</span>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label>Zip Code</Label>
                            <Input 
                              placeholder="e.g. 90210" 
                              value={formData.zipCode}
                              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                              className="h-12 rounded-xl"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-4">
                              <Label className="text-base font-bold">Square Footage: {formData.sqft} sq ft</Label>
                            </div>
                            <Slider 
                              value={[formData.sqft]} 
                              max={8000} 
                              step={100}
                              onValueChange={(val) => setFormData({ ...formData, sqft: val[0] })}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-sm font-bold">Bedrooms</Label>
                              <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => setFormData({ ...formData, beds: Math.max(1, formData.beds - 1) })}>-</Button>
                                <span className="font-bold text-xl w-8 text-center">{formData.beds}</span>
                                <Button variant="outline" size="icon" onClick={() => setFormData({ ...formData, beds: formData.beds + 1 })}>+</Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-bold">Bathrooms</Label>
                              <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => setFormData({ ...formData, baths: Math.max(1, formData.baths - 1) })}>-</Button>
                                <span className="font-bold text-xl w-8 text-center">{formData.baths}</span>
                                <Button variant="outline" size="icon" onClick={() => setFormData({ ...formData, baths: formData.baths + 1 })}>+</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {['standard', 'deep', 'move', 'mansion'].map((service) => (
                          <button
                            key={service}
                            onClick={() => setFormData({ ...formData, serviceType: service })}
                            className={cn(
                              "w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left",
                              formData.serviceType === service 
                                ? "border-primary bg-primary/5" 
                                : "border-slate-100 hover:border-primary/30"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className={cn("p-3 rounded-xl", formData.serviceType === service ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}>
                                {service === 'standard' && <Check />}
                                {service === 'deep' && <Sparkles />}
                                {service === 'move' && <Calendar />}
                                {service === 'mansion' && <Zap />}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 capitalize">{service} Cleaning</div>
                                <div className="text-xs text-slate-500">Perfect for {service === 'standard' ? 'maintenance' : 'thorough cleaning'}</div>
                              </div>
                            </div>
                            {formData.serviceType === service && <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        {[
                          { id: 'fridge', name: 'Inside Fridge', icon: <Wind /> },
                          { id: 'oven', name: 'Inside Oven', icon: <Zap /> },
                          { id: 'windows', name: 'Windows', icon: <Layers /> },
                          { id: 'cabinets', name: 'Cabinets', icon: <Plus /> },
                        ].map((addon) => (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={cn(
                              "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all",
                              formData.addons.includes(addon.id) 
                                ? "border-primary bg-primary/5 text-primary" 
                                : "border-slate-100 text-slate-500"
                            )}
                          >
                            <div className="p-3 bg-slate-100 rounded-full">{addon.icon}</div>
                            <span className="text-sm font-bold">{addon.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Sparkles className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Book!</h3>
                        <p className="text-slate-500 mb-8">Based on your details, here is your personalized quote.</p>
                        
                        <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
                          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Total</div>
                          <div className="text-6xl font-black text-slate-900 mb-4">${estimate.price.toFixed(0)}</div>
                          <div className="flex justify-center gap-8 text-sm font-medium text-slate-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              {estimate.duration} Hours
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              {estimate.teamSize} Cleaners
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-12 flex items-center justify-between">
                    {currentStep > 0 && (
                      <Button variant="ghost" onClick={prevStep} className="font-bold">
                        <ChevronLeft className="mr-2" /> Back
                      </Button>
                    )}
                    <div className="ml-auto">
                      {currentStep < steps.length - 1 ? (
                        <Button onClick={nextStep} className="h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/20">
                          Next Step <ChevronRight className="ml-2" />
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleSecureBooking}
                          disabled={saving}
                          className="h-14 px-12 text-lg font-black rounded-xl shadow-xl shadow-primary/30"
                        >
                          {saving ? 'Processing...' : 'Secure Booking'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary Sidebar (Visible on Desktop) */}
                <div className="hidden lg:block w-80 bg-slate-900 p-12 text-white">
                  <h4 className="text-xl font-bold mb-8">Summary</h4>
                  <div className="space-y-6">
                    <div>
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Property</div>
                      <div className="font-bold capitalize">{formData.propertyType} • {formData.sqft} sq ft</div>
                      <div className="text-sm text-slate-400">{formData.beds} Beds, {formData.baths} Baths</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Service</div>
                      <div className="font-bold capitalize">{formData.serviceType} Cleaning</div>
                    </div>
                    {formData.addons.length > 0 && (
                      <div>
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Add-ons</div>
                        <div className="text-sm font-medium text-emerald-400">+{formData.addons.length} items selected</div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-12 border-t border-slate-800">
                    <div className="text-3xl font-black">${estimate.price.toFixed(0)}</div>
                    <div className="text-slate-400 text-xs font-medium mt-1">Instant Quote • No Obligations</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EstimateCalculator;
