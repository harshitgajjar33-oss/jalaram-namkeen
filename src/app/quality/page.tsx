"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Zap, CheckCircle2, Factory, Microscope } from "lucide-react";

export default function QualityPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <div className="bg-white pt-24">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent rounded-full blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-playfair font-bold text-white mb-6"
          >
            The Gold Standard <br />
            <span className="text-secondary italic">of Hygiene</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto font-inter"
          >
            We combine traditional recipes with state-of-the-art manufacturing to ensure the highest quality in every single packet.
          </motion.p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title">Global Certifications</h2>
            <p className="section-subtitle">Our commitment to safety is validated by world-class regulatory bodies.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "FSSAI Elite",
                desc: "Full compliance with Indian food safety standards for industrial production.",
                icon: <ShieldCheck className="text-primary" size={40} />
              },
              {
                name: "ISO 9001:2015",
                desc: "Maintaining the international benchmark for quality management systems.",
                icon: <Award className="text-primary" size={40} />
              },
              {
                name: "HACCP Certified",
                desc: "Rigorous hazard analysis and critical control points in our processing line.",
                icon: <Zap className="text-primary" size={40} />
              }
            ].map((cert, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="glass-card text-center !p-12"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-8">
                  {cert.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{cert.name}</h3>
                <p className="text-dark/60 leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="/images/quality.png"
                alt="Modern Manufacturing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-2">Facility Feature</p>
                <h3 className="text-3xl font-playfair font-bold text-white">State-of-the-Art Production</h3>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="section-title !text-left mb-12">Unwavering Standards, Modern Technology</h2>
              <div className="space-y-10">
                {[
                  {
                    icon: <Factory />,
                    title: "Automated Processing",
                    desc: "Minimum human touch to maintain maximum hygiene throughout the frying and mixing stages."
                  },
                  {
                    icon: <Microscope />,
                    title: "Quality Lab",
                    desc: "Every batch is tested for oil quality, moisture content, and spice profile before packaging."
                  },
                  {
                    icon: <ShieldCheck />,
                    title: "Air-Tight Packaging",
                    desc: "Using nitrogen flushing technology to ensure freshness and shelf-life for global shipping."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                      <p className="text-dark/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-8">Want to see our facility?</h2>
          <p className="text-white/60 mb-12 max-w-xl mx-auto">We welcome bulk buyers and distributors for pre-scheduled factory visits.</p>
          <div className="flex justify-center gap-6">
            <Link href="/contact" className="btn-premium">
              Book a Factory Visit
            </Link>
            <Link href="/contact" className="btn-outline !text-white !border-white/20 hover:!border-white">
              Download Quality manual
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
