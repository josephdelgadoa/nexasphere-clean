import React from 'react';
import Link from 'next/link';
import { Sparkles, Globe, Users, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                NexaSphere<span className="text-primary">Clean</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Elevating the standard of cleanliness through technology and unparalleled attention to detail. Your space, our mission.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Users className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="#estimate" className="hover:text-primary transition-colors">Estimate Tool</Link></li>
              <li><Link href="#gallery" className="hover:text-primary transition-colors">Work Gallery</Link></li>
              <li><Link href="/locations" className="hover:text-primary transition-colors">Service Areas</Link></li>
              <li><Link href="/join" className="hover:text-primary transition-colors">Join as Cleaner</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li>Residential Cleaning</li>
              <li>Deep Cleaning</li>
              <li>Move In / Out</li>
              <li>Luxury Mansions</li>
              <li>Airbnb Specialty</li>
              <li>Office Cleaning</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Clean Ave, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(800) NEXA-CLEAN</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@nexasphere.clean</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} NexaSphere Clean. All rights reserved. Designed with ❤️ by Antigravity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
