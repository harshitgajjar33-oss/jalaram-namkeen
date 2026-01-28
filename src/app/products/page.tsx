'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Filter, ArrowRight, Loader2 } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/food-items');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: FoodItem[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-cream min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-playfair font-bold text-white mb-6 text-center"
          >
            Our Flavor <span className="text-secondary italic">Catalog</span>
          </motion.h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mt-12">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
            <input
              type="text"
              placeholder="Search for snacks (e.g. Sev, Gathiya, Wafers...)"
              className="w-full bg-white rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-secondary/20 shadow-premium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="text-primary font-bold animate-pulse">Waking up the kitchen...</p>
            </div>
          ) : error ? (
            <div className="text-center py-40">
              <p className="text-red-500 font-bold mb-4">Error loading products: {error}</p>
              <button onClick={() => window.location.reload()} className="btn-premium">Retry</button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-12">
                <p className="text-dark/40 font-bold uppercase tracking-widest text-sm">
                  Showing {filteredProducts.length} Results
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-primary font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors">
                    <Filter size={18} /> Filter
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={product.id}
                      className="glass-card !p-0 group overflow-hidden"
                    >
                      <Link href={`/products/${product.id}`}>
                        <div className="relative h-72 overflow-hidden">
                          <Image
                            src={product.imageUrl || "/images/packaging.png"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-secondary text-primary font-bold text-[10px] uppercase tracking-widest py-1 px-3 rounded-full">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="p-8">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-dark/60 text-sm mb-6 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-black/5">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-dark/40 font-bold">Price Inquiry</p>
                            <p className="text-xl font-bold text-primary">₹{product.price}</p>
                          </div>
                          <Link href={`/products/${product.id}`} className="w-12 h-12 rounded-full bg-primary text-secondary flex items-center justify-center hover:scale-110 transition-transform shadow-premium">
                            <ArrowRight size={20} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-40">
                  <ShoppingBag className="mx-auto text-dark/10 mb-6" size={80} />
                  <h3 className="text-2xl font-playfair font-bold text-primary mb-2">No Snacks Found</h3>
                  <p className="text-dark/40">Try searching for something else, like "Sev" or "Wafers".</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Wholesale Banner */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[40px] p-12 border border-black/5 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-premium">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-4">Interested in Bulk Pricing?</h2>
              <p className="text-dark/60">We offer special rates for corporate gifting, white-labeling, and international distribution.</p>
            </div>
            <Link href="/contact" className="btn-premium whitespace-nowrap">
              Get Wholesale Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}