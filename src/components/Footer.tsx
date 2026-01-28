import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="object-cover" />
              </div>
              <span className="text-2xl font-playfair font-bold text-white">
                Jalaram <span className="text-accent">Namkeen</span>
              </span>
            </Link>
            <p className="text-white/50 mb-8 leading-relaxed">
              Crafting authentic Indian savory snacks since 1985. We blend tradition with technology to deliver the true taste of India at an industrial scale.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 text-secondary uppercase tracking-widest text-sm">Quick Navigation</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Product Catalog', href: '/products' },
                { name: 'Quality Standards', href: '/quality' },
                { name: 'Our Story', href: '/about' },
                { name: 'Become a Partner', href: '/contact' },
                { name: 'Admin Dashboard', href: '/admin' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white flex items-center group transition-colors">
                    <ArrowRight size={14} className="mr-2 text-accent opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 text-secondary uppercase tracking-widest text-sm">Contact Details</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-white/60 leading-relaxed">
                  Deendayal Industrial Area Street No 4,<br />
                  Near Aji Dem Chokdi, Rajkot - 360003
                </span>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-white/60">+91 97279 92997</span>
              </li>
              <li className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-white/60">gruhudhyogjalaram@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 text-secondary uppercase tracking-widest text-sm">Newsletter</h3>
            <p className="text-white/50 mb-6 text-sm">Subscribe to get the latest updates on new flavors and bulk offers.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-accent/80 text-white px-4 rounded-lg transition-colors">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Jalaram Namkeen Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex space-x-8 text-sm text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
