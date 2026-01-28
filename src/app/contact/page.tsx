"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const whatsappNumber = "919727992997";
    const text = `*New Partnership Inquiry*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Company:* ${formData.company}%0A` +
      `*Message:* ${formData.message}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');

    alert('Thank you! Redirecting you to WhatsApp to complete your inquiry...');
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  return (
    <div className="bg-cream min-h-screen pt-24">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-playfair font-bold text-primary mb-6"
          >
            Let's Start a <span className="italic text-accent">Partnership</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark/60 max-w-2xl mx-auto font-inter"
          >
            Whether you have a bulk requirement, distribution inquiry, or just want to say hello, we're all ears.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="glass-card !bg-primary !text-white !p-10">
                <h2 className="text-3xl font-playfair font-bold mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Our Headquarters</h4>
                      <p className="text-white/70">Deendayal Industrial Area Street No 4, Near Aji Dem Chokdi, Rajkot - 360003</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Phone Number</h4>
                      <p className="text-white/70">+91 97279 92997</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary mb-1">Email Address</h4>
                      <p className="text-white/70">gruhudhyogjalaram@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10">
                  <h4 className="font-bold text-secondary mb-6">Business Hours</h4>
                  <div className="flex justify-between text-white/70 text-sm">
                    <span>Monday - Saturday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="glass-card !p-12 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-cream/50 border border-black/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent focus:bg-white transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-cream/50 border border-black/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-cream/50 border border-black/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company Ltd."
                      className="w-full bg-cream/50 border border-black/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Your Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full bg-cream/50 border border-black/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent focus:bg-white transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-premium w-full group !bg-[#25D366] !border-[#25D366]">
                  Connect on WhatsApp
                  <MessageSquare size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
