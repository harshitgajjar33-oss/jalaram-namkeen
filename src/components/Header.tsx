"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/products' },
    { name: 'Quality', href: '/quality' },
    { name: 'Story', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-glass"></div>
      <div className="container mx-auto px-6 py-4 relative flex justify-between items-center">
        <Link href="/" className="group flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-premium overflow-hidden">
            <Image src="/logo.jpg" alt="Jalaram Namkeen" width={48} height={48} className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-base md:text-2xl font-playfair font-bold text-primary leading-tight">
              Jalaram <span className="text-accent">Namkeen</span>
            </span>
            <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] text-dark/40 font-montserrat">Authentic Indian Flavors</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {menuItems.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link font-montserrat text-sm uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3 md:space-x-6">
          <Link href="/products" className="p-2 text-dark/60 hover:text-primary transition-colors relative group">
            <ShoppingBag size={20} className="md:w-[22px] md:h-[22px]" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
          </Link>
          <Link href="/contact" className="btn-premium !py-2.5 !px-5 md:!py-3 md:!px-6 text-xs md:text-sm hidden md:flex">
            Bulk Inquiry
            <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
          </Link>
          <button
            className="lg:hidden p-2 text-primary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} className="md:w-[28px] md:h-[28px]" /> : <Menu size={24} className="md:w-[28px] md:h-[28px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-black/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {menuItems.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-playfair font-bold text-primary hover:text-accent transition-colors flex justify-between items-center group"
                >
                  {link.name}
                  <ChevronRight size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-premium w-full justify-center !py-4"
              >
                Inquire for Bulk Orders
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
