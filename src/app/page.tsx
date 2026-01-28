"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star, ShieldCheck, Truck, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Authentic Indian Snacks"
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-white"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Est. 1985 • A Legacy of Taste
            </span>
            <h1 className="text-5xl lg:text-7xl font-playfair font-bold mb-6 leading-[1.1]">
              Authentic Flavors, <br />
              <span className="gradient-text">Industrial Scale</span>
            </h1>
            <p className="text-lg text-white/70 mb-10 max-w-xl font-inter leading-relaxed">
              Jalaram Namkeen brings you a premium selection of traditional Indian snacks, crafted with passion and the finest ingredients for global distribution.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-premium">
                Explore Catalog
                <ChevronRight size={20} />
              </Link>
              <Link href="/contact" className="btn-outline !border-white/20 !text-white hover:!border-white">
                Contact for Bulk
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-secondary/20 flex items-center justify-center text-[10px] font-bold">
                    User
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/50">
                Trusted by <span className="text-white font-bold">500+</span> Distributors Globally
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="hidden lg:block relative h-[600px]"
          >
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full"></div>
            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-float">
              <Image
                src="/images/packaging.png"
                alt="Premium Snack Packaging"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="w-full py-12 bg-white relative z-20 -mt-10 lg:container mx-auto px-6 rounded-3xl shadow-premium border border-black/5 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <Clock className="text-accent" />, title: "35+ Years", desc: "Of Culinary Excellence" },
          { icon: <Star className="text-accent" />, title: "100+ Products", desc: "Authentic Varieties" },
          { icon: <ShieldCheck className="text-accent" />, title: "FSSAI Certified", desc: "Quality Guaranteed" },
          { icon: <Truck className="text-accent" />, title: "Pan-India", desc: "Efficient Distribution" },
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-4">
              {stat.icon}
            </div>
            <h3 className="text-xl font-bold text-primary mb-1">{stat.title}</h3>
            <p className="text-xs text-dark/50 uppercase tracking-widest">{stat.desc}</p>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className="w-full py-24 bg-cream">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp} className="relative aspect-square rounded-3xl overflow-hidden group">
            <Image
              src="/images/quality.png"
              alt="Quality Production"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500"></div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 inline-block">Our Tradition</span>
            <h2 className="section-title !text-left">Uncompromising Quality in Every Bite</h2>
            <p className="text-dark/70 mb-8 leading-relaxed text-lg">
              Behind every crunch is a story of tradition, innovation, and an unwavering commitment to quality. Since 1985, Jalaram Namkeen has been at the forefront of the savory snacks industry, blending age-old recipes with state-of-the-art production technology.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { title: "Pure Ingredients", desc: "We source only the finest spices and grains directly from farmers." },
                { title: "Modern Safety", desc: "Our facility maintains the highest hygiene standards (FSSAI Certified)." },
                { title: "Global Reach", desc: "Equipped to handle high-volume bulk orders for international markets." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{item.title}</h4>
                    <p className="text-sm text-dark/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/quality" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300 group">
              Learn About Our Standards
              <ArrowRight size={20} className="text-accent" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title">Explore Our Flavor Universe</h2>
            <p className="section-subtitle">From spicy sev to classic wafers, discover the range that makes us India's favorite snack partner.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Classic Sev & Gathia", desc: "The ultimate Indian staple, crafted for the perfect crunch.", color: "bg-secondary/10" },
              { title: "Premium Wafers", desc: "Thin, crispy, and flavored with our signature spice blends.", color: "bg-primary/5" },
              { title: "Specialty Mixes", desc: "Complex flavor profiles that define the authentic street taste.", color: "bg-accent/10" }
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card ${cat.color} group cursor-pointer hover:-translate-y-2 transition-all duration-500`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-premium flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <Star className="text-accent" size={30} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{cat.title}</h3>
                <p className="text-dark/60 mb-6">{cat.desc}</p>
                <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                  View Catalog <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk CTA Section */}
      <section className="w-full py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[40px] overflow-hidden bg-primary p-12 lg:p-24 text-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[200%] bg-accent/20 rounded-full blur-[120px]"></div>
              <div className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[200%] bg-secondary/20 rounded-full blur-[120px]"></div>
            </div>

            <motion.div {...fadeInUp} className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-white mb-8">
                Ready to Partner with the <span className="text-secondary italic">Flavor Experts?</span>
              </h2>
              <p className="text-lg text-white/70 mb-12 leading-relaxed">
                Whether you're looking for white-label manufacturing or becoming an authorized distributor, we're here to grow together.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="btn-premium">
                  Inquire Now for Bulk Orders
                  <Truck size={20} />
                </Link>
                <Link href="/contact" className="btn-outline !border-white/20 !text-white hover:!border-white">
                  Get Wholesale Quote
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
