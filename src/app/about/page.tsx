"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { History, Heart, Users, Globe, ChevronRight } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <div className="bg-cream pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Our Heritage"
          fill
          className="object-cover opacity-20"
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-6 inline-block"
          >
            Since 1985
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-playfair font-bold text-primary mb-8"
          >
            A Legacy of <br />
            <span className="italic text-accent">Taste & Tradition</span>
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <div className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm">
                <History size={20} className="text-accent" />
                Our Journey
              </div>
              <h2 className="section-title !text-left">From a Humble Kitchen to Global Distribution</h2>
              <div className="space-y-6 text-dark/70 text-lg leading-relaxed">
                <p>
                  The Jalaram story began in 1985 in a small, aromatic kitchen in Gujarat. Armed with traditional family recipes and a passion for perfection, our founders set out to create snacks that weren't just food, but a memory of home.
                </p>
                <p>
                  What started as a local favorite quickly grew into a regional phenomenon. Our uncompromising stance on ingredient purity and the "Ghar Jaisa" (home-like) taste became our signature, allowing us to scale from a small workshop to a state-of-the-art industrial facility.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/5">
                <div>
                  <h4 className="text-3xl font-playfair font-bold text-primary mb-1">35+</h4>
                  <p className="text-sm text-dark/50 uppercase tracking-widest">Years of Expertise</p>
                </div>
                <div>
                  <h4 className="text-3xl font-playfair font-bold text-primary mb-1">50M+</h4>
                  <p className="text-sm text-dark/50 uppercase tracking-widest">Packets Shipped</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float"></div>
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src="/images/packaging.png"
                  alt="Our Pride"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card !p-8 !rounded-2xl max-w-xs shadow-2xl border-white">
                <p className="text-primary font-bold italic mb-2">"Quality is the silent ambassador of our brand."</p>
                <p className="text-xs text-dark/40 uppercase tracking-widest">— The Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="section-title">The Pillars of Jalaram</h2>
            <p className="section-subtitle">Our values are deeply rooted in Indan culture and industrial excellence.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart />,
                title: "Authentic Love",
                desc: "Every spice blend is crafted with the same care we use for our own family."
              },
              {
                icon: <Users />,
                title: "Partnership First",
                desc: "We grow when our distributors grow. We believe in long-term, ethical partnerships."
              },
              {
                icon: <Globe />,
                title: "Global Standards",
                desc: "Traditional taste meets international food safety and hygiene protocols."
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="glass-card !bg-white group hover:!bg-primary transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-white transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-white transition-colors">{value.title}</h3>
                <p className="text-dark/60 leading-relaxed group-hover:text-white/70 transition-colors">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[50px] p-12 lg:p-24 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent"></div>
            <motion.div {...fadeInUp} className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-white mb-8">Ready to grow with us?</h2>
              <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                Join our network of authorized distributors and bring the authentic taste of Jalaram Namkeen to your region.
              </p>
              <Link href="/contact" className="btn-premium mx-auto">
                Become a Partner Today
                <ChevronRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
