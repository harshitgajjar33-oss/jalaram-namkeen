"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingBag, ShieldCheck, Truck, Star, ArrowRight, Loader2, Maximize2 } from "lucide-react";

interface ProductImage {
    id: string;
    url: string;
}

interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    images?: ProductImage[];
}

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<FoodItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState<string>("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/food-items/${id}`);
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();
                setProduct(data);
                setActiveImage(data.imageUrl); // Set main image as default
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-cream text-dark">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-primary font-bold">Unlocking flavor profile...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-cream text-dark">
                <h2 className="text-3xl font-playfair font-bold text-primary">Snack Not Found</h2>
                <Link href="/products" className="btn-premium">
                    <ChevronLeft size={20} /> Back to Catalog
                </Link>
            </div>
        );
    }

    // Combine main image with additional images for the gallery
    const gallery = [
        { id: 'main', url: product.imageUrl },
        ...(product.images || [])
    ].filter(img => img.url);

    return (
        <main className="bg-cream min-h-screen pt-32 pb-24 text-dark">
            <div className="container mx-auto px-6">
                <Link href="/products" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
                    <ChevronLeft size={16} /> Back to All Snacks
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Gallery Section */}
                    <div className="space-y-6">
                        <motion.div
                            layoutId="mainImage"
                            className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-white border border-black/5"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={activeImage || "/images/packaging.png"}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute top-8 left-8 z-10">
                                <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm uppercase tracking-widest shadow-xl">
                                    {product.category}
                                </span>
                            </div>

                            <button className="absolute bottom-8 right-8 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-primary hover:scale-110 transition-transform">
                                <Maximize2 size={20} />
                            </button>
                        </motion.div>

                        {/* Thumbnails */}
                        {gallery.length > 1 && (
                            <div className="grid grid-cols-5 gap-4 px-2">
                                {gallery.map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImage(img.url)}
                                        className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img.url ? 'border-accent shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <Image
                                            src={img.url}
                                            alt="Thumbnail"
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="text-accent fill-accent" />)}
                                <span className="text-dark/40 text-xs font-bold uppercase tracking-widest ml-2">Premium Choice</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-primary mb-6">{product.name}</h1>
                            <div className="flex items-baseline gap-4">
                                <p className="text-4xl font-bold text-accent">₹{product.price}</p>
                                <span className="text-sm text-dark/40 font-bold uppercase tracking-widest">Ex-Factory Price</span>
                            </div>
                        </div>

                        <div className="glass-card !bg-white/50 !p-8 border-primary/5">
                            <p className="text-lg text-dark/70 leading-relaxed font-inter italic">
                                {product.description || "Indulge in the authentic taste of our premium selection. Crafted with time-honored recipes and the finest spices, this snack represents the true essence of Indian savory traditions."}
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-6 py-10 border-y border-black/5">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-primary uppercase tracking-tight">Pure Quality</h4>
                                    <p className="text-xs text-dark/40">FSSAI Certified Unit</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center text-accent shadow-sm">
                                    <Truck size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-accent uppercase tracking-tight">Bulk Ready</h4>
                                    <p className="text-xs text-dark/40">Dispatch in 24-48h</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-4">
                            <Link href="/contact" className="btn-premium w-full !py-6 text-xl group">
                                <span>Inquire for Wholesale</span>
                                <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
                            </Link>
                            <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-dark/30">
                                <span>Distributor Network</span>
                                <div className="w-1 h-1 rounded-full bg-dark/20"></div>
                                <span>Export Quality</span>
                                <div className="w-1 h-1 rounded-full bg-dark/20"></div>
                                <span>Bulk Packaging</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Discovery Section */}
                <section className="mt-32">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-playfair font-bold text-primary">Discover More</h2>
                            <p className="text-dark/40 mt-2">The finest flavors from our kitchen to yours</p>
                        </div>
                        <Link href="/products" className="group text-primary font-bold flex items-center gap-2">
                            View Complete Collection <ArrowRight size={20} className="text-accent group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 opacity-40">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/5] rounded-[30px] bg-white/20 border-2 border-dashed border-black/5 flex items-center justify-center">
                                <p className="text-dark/10 font-bold uppercase tracking-widest text-[10px] transform -rotate-45">Related Product</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
