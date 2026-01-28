"use client";

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "919727992997";
  const message = "Hello Jalaram Namkeen! I'm interested in your bulk snack options and wholesale opportunities.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-5 rounded-full shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] flex items-center justify-center z-50 group overflow-hidden"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <MessageCircle size={28} />
      <span className="max-w-0 group-hover:max-w-xs group-hover:ml-3 overflow-hidden transition-all duration-500 font-bold text-sm whitespace-nowrap">
        WhatsApp Inquiry
      </span>
      <div className="absolute -inset-1 border-4 border-white/20 rounded-full animate-ping opacity-20 pointer-events-none"></div>
    </motion.a>
  );
};

export default WhatsAppButton;
