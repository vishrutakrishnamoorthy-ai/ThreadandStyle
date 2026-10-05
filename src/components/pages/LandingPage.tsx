import React from 'react';
import { ArrowRight, Scissors, Ruler, Sparkles, CheckCircle2, Clock, Calendar, Star, ShieldCheck, HeartHandshake } from 'lucide-react';
import { GarmentIllustration } from '../common/DesignIllustrations';
import { Design } from '../../types';

interface LandingPageProps {
  onExploreCollections: () => void;
  onStartCustomizer: () => void;
  onBookAppointment: () => void;
  featuredDesigns: Design[];
  onSelectDesign: (design: Design) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreCollections,
  onStartCustomizer,
  onBookAppointment,
  featuredDesigns,
  onSelectDesign,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1716]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#EAE3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#7A6B58]">
                <span className="w-6 h-[1px] bg-[#6B1D2F]" />
                Bespoke Couture & Tailoring Atelier
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1716] leading-[1.12] text-balance">
                Designed for You. <br />
                <span className="italic font-normal text-[#6B1D2F]">Tailored to Perfection.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#554C41] max-w-xl leading-relaxed">
                Step into an elevated digital atelier. From handcrafted bridal lehengas and royal aari silk blouses to bespoke evening gowns—we translate your personal silhouette into heirloom tailoring with flawless precision.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onStartCustomizer}
                  className="px-6 py-3.5 rounded-xl bg-[#6B1D2F] text-white font-medium text-sm hover:bg-[#521322] transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Design Your Outfit</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={onBookAppointment}
                  className="px-6 py-3.5 rounded-xl bg-white border border-[#D5CABE] text-[#2C2723] font-medium text-sm hover:bg-[#F3EFEA] hover:border-[#6B1D2F]/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#6B1D2F]" />
                  <span>Book an Appointment</span>
                </button>
              </div>

              {/* Trust signals */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-[#EAE3D7] max-w-lg text-[#3E3831]">
                <div>
                  <p className="text-2xl font-serif font-bold text-[#1A1716] tabular-nums">2,400+</p>
                  <p className="text-xs text-[#706659] mt-0.5">Bespoke Outfits Delivered</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-[#1A1716] tabular-nums">10-Point</p>
                  <p className="text-xs text-[#706659] mt-0.5">Fitting & Quality Check</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-[#1A1716] tabular-nums">100%</p>
                  <p className="text-xs text-[#706659] mt-0.5">Fit Guarantee</p>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-[#F4EFE6] border border-[#DDD3C3] rounded-3xl p-6 shadow-xl">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-b from-[#F9F5EE] to-[#EAE0D1] p-4 flex flex-col items-center justify-center relative overflow-hidden border border-[#E5DAC8]">
                  <GarmentIllustration type="blouse" color="#6B1D2F" accentColor="#C5A059" className="w-full h-full max-h-[360px]" />
                  
                  {/* Floating Atelier Spec Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-[#E2D8C7] shadow-sm">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-serif font-bold text-[#1A1716]">Couture Aari Silk Blouse</span>
                      <span className="font-semibold text-[#6B1D2F] tabular-nums">₹3,200</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#706659] mt-1">
                      <span>Boat Neck</span>
                      <span>·</span>
                      <span>Elbow Sleeve</span>
                      <span>·</span>
                      <span>Raw Mulberry Silk</span>
                    </div>
                  </div>
                </div>

                {/* Badge accent */}
                <div className="mt-4 flex items-center justify-between px-2 text-xs text-[#6B6154]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Ruler className="w-3.5 h-3.5 text-[#6B1D2F]" />
                    9 Body Proportions Profile
                  </span>
                  <span className="font-serif italic">Indiranagar Atelier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
              Curated Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
              Featured Signature Silhouettes
            </h2>
            <p className="text-sm text-[#5C5347] mt-2 max-w-xl">
              Each design is handcrafted by our master tailors and embroiderers, cut uniquely to your custom body measurements.
            </p>
          </div>

          <button
            onClick={onExploreCollections}
            className="mt-4 sm:mt-0 text-sm font-semibold text-[#6B1D2F] hover:text-[#4A101D] flex items-center gap-1.5 group cursor-pointer"
          >
            <span>Explore All 9 Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesigns.slice(0, 4).map((design) => (
            <div
              key={design.id}
              className="bg-[#F8F4EC] rounded-2xl border border-[#E3DACB] overflow-hidden group hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="p-4 bg-gradient-to-b from-[#F2ECE1] to-[#E9E1D3] aspect-[4/4.5] flex items-center justify-center relative">
                <GarmentIllustration type={design.category} className="w-full h-full max-h-56" />
                <span className="absolute top-3 left-3 text-[11px] font-medium text-[#7C7164] bg-white/90 px-2 py-0.5 rounded-md border border-[#E3DACB]">
                  {design.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1A1716] group-hover:text-[#6B1D2F] transition-colors leading-snug">
                    {design.name}
                  </h3>
                  <p className="text-xs text-[#5D5448] mt-1.5 line-clamp-2 leading-relaxed">
                    {design.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#706659] mt-3">
                    <span>{design.neckline}</span>
                    <span>·</span>
                    <span>{design.sleeve}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EAE3D7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C8275] uppercase block">Starting from</span>
                    <span className="font-serif font-bold text-base text-[#1A1716] tabular-nums">
                      ₹{design.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectDesign(design)}
                      className="px-3 py-1.5 rounded-lg bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] transition-colors cursor-pointer"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Atelier Process */}
      <section className="py-20 bg-[#F4EFE6] border-y border-[#E2D8C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
              The Thread & Style Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1716] mt-1">
              How Bespoke Tailoring Works
            </h2>
            <p className="text-sm text-[#5C5347] mt-2">
              A transparent, seamless journey from digital conceptualization to handcrafted perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C3]">
              <span className="text-xs font-bold text-[#6B1D2F] uppercase tracking-wider block mb-3">Step 01</span>
              <div className="w-10 h-10 rounded-xl bg-[#F0E8DC] flex items-center justify-center text-[#6B1D2F] mb-4">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1A1716]">Select & Customize</h3>
              <p className="text-xs text-[#5D5448] mt-2 leading-relaxed">
                Choose clothing type, neckline, sleeve cut, back styling, and luxurious boutique fabrics or your own material.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C3]">
              <span className="text-xs font-bold text-[#6B1D2F] uppercase tracking-wider block mb-3">Step 02</span>
              <div className="w-10 h-10 rounded-xl bg-[#F0E8DC] flex items-center justify-center text-[#6B1D2F] mb-4">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1A1716]">Measure & Upload</h3>
              <p className="text-xs text-[#5D5448] mt-2 leading-relaxed">
                Save your body measurements using our visual anatomical guide or book an in-atelier fitting appointment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C3]">
              <span className="text-xs font-bold text-[#6B1D2F] uppercase tracking-wider block mb-3">Step 03</span>
              <div className="w-10 h-10 rounded-xl bg-[#F0E8DC] flex items-center justify-center text-[#6B1D2F] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1A1716]">Craft & 10-Stage Tracking</h3>
              <p className="text-xs text-[#5D5448] mt-2 leading-relaxed">
                Watch your outfit advance from pattern cutting to hand embroidery, stitching, and trial-ready stage with real-time updates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C3]">
              <span className="text-xs font-bold text-[#6B1D2F] uppercase tracking-wider block mb-3">Step 04</span>
              <div className="w-10 h-10 rounded-xl bg-[#F0E8DC] flex items-center justify-center text-[#6B1D2F] mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1A1716]">Trial & Perfect Delivery</h3>
              <p className="text-xs text-[#5D5448] mt-2 leading-relaxed">
                Visit for trial fitting or receive your garment delivered in a protective keepsake wardrobe cover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B58]">
            Voices of Our Patrons
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1A1716] mt-1">
            Loved by Brides & Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#F7F2EA] border border-[#E1D7C8] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#C5A059] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-[#403830] leading-relaxed italic">
                “The precision on my wedding reception lehenga was unbelievable. Ustad Mumtaz and Meera ma’am ensured all 36 kalis aligned perfectly with the can-can flare. The tracking timeline kept my pre-wedding anxiety at zero!”
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E3DACB]">
              <p className="font-serif font-bold text-sm text-[#1A1716]">Pooja Verma</p>
              <p className="text-xs text-[#7A7063]">Bridal Client · Koramangala, Bengaluru</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F2EA] border border-[#E1D7C8] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#C5A059] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-[#403830] leading-relaxed italic">
                “Finding a tailor who understands both classic Kanjeevaram necklines and modern boat-neck fits was impossible until Thread & Style. My measurements are saved in my profile, making repeat festival orders effortless.”
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E3DACB]">
              <p className="font-serif font-bold text-sm text-[#1A1716]">Ananya Sharma</p>
              <p className="text-xs text-[#7A7063]">Regular Patron · Lavelle Road, Bengaluru</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F2EA] border border-[#E1D7C8] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#C5A059] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-[#403830] leading-relaxed italic">
                “The fabric selection and transparency in pricing are unparalleled. You know exactly what you are paying for—cutting, silk velvet, and hand embroidery. Master Rameshwar is truly a craftsman of the highest order.”
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E3DACB]">
              <p className="font-serif font-bold text-sm text-[#1A1716]">Divya Iyer</p>
              <p className="text-xs text-[#7A7063]">Architect & Designer · Richmond Town</p>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Contact & Footer */}
      <footer className="bg-[#1F1918] text-[#E8DFD4] pt-16 pb-12 border-t border-[#382F2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#382F2D]">
            <div className="md:col-span-2 space-y-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                Thread & Style
              </span>
              <p className="text-xs text-[#B2A495] max-w-sm leading-relaxed">
                Bespoke tailoring atelier blending time-honored Indian hand craftsmanship with digital precision. We specialize in bridal couture, royal silk blouses, festive ensembles, and evening silhouettes.
              </p>
              <div className="text-xs text-[#C5A059] font-medium pt-2">
                Open Tuesday – Sunday: 10:00 AM – 8:00 PM (Monday Closed)
              </div>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-white text-sm mb-3">Boutique Atelier</h4>
              <p className="text-xs text-[#B2A495] leading-relaxed">
                Atelier #4, 100 Feet Road,<br />
                Indiranagar, Bengaluru,<br />
                Karnataka 560038, India
              </p>
              <p className="text-xs text-[#B2A495] mt-2">
                Appointments: +91 98401 23456<br />
                Email: atelier@threadandstyle.com
              </p>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-white text-sm mb-3">Atelier Services</h4>
              <ul className="text-xs text-[#B2A495] space-y-1.5">
                <li>• Bridal Trousseau Consulting</li>
                <li>• Maggam & Zardozi Hand Embroidery</li>
                <li>• Saved Anatomical Measurement Vault</li>
                <li>• 10-Stage Real-Time Order Tracking</li>
                <li>• Doorstep & Atelier Fitting Trials</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8071]">
            <p>© {new Date().getFullYear()} Thread & Style Atelier. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span>Bespoke Tailoring Standard</span>
              <span>·</span>
              <span>Zero-Tolerance Fit Guarantee</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
