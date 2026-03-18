import { ChevronLeft, ShoppingBag, ShieldCheck, Truck, Star, ArrowRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products as staticProducts } from "@/data/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return staticProducts.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = staticProducts.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    const gallery = [
        { id: 'main', url: product.imageUrl },
        ...(product.images || [])
    ].filter(img => img.url);

    return (
        <main className="bg-cream min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 text-dark font-inter">
            <div className="container mx-auto px-6">
                <Link href="/products" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-8 md:mb-12 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    <ChevronLeft size={16} /> Back to All Snacks
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Gallery Section */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="relative aspect-square rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl bg-white border border-black/5">
                            <div className="absolute inset-0">
                                <Image
                                    src={product.imageUrl || "/images/packaging.png"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                                <span className="bg-secondary text-primary font-bold px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-sm uppercase tracking-widest shadow-xl">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {gallery.length > 1 && (
                            <div className="grid grid-cols-5 gap-4 px-2">
                                {gallery.map((img) => (
                                    <div
                                        key={img.id}
                                        className="relative aspect-square rounded-2xl overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-all cursor-pointer"
                                    >
                                        <Image
                                            src={img.url}
                                            alt="Thumbnail"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-accent fill-accent md:w-4 md:h-4" />)}
                                <span className="text-dark/40 text-[10px] md:text-xs font-bold uppercase tracking-widest ml-2">Premium Choice</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-playfair font-bold text-primary mb-6 leading-tight">{product.name}</h1>
                            <div className="flex items-baseline gap-4">
                                <p className="text-3xl md:text-4xl font-bold text-accent">₹{product.price}</p>
                                <span className="text-[10px] md:text-sm text-dark/40 font-bold uppercase tracking-widest">Ex-Factory Price</span>
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-xl border border-primary/5 rounded-3xl p-6 md:p-8 shadow-glass">
                            <p className="text-base md:text-lg text-dark/70 leading-relaxed font-inter italic">
                                {product.description || "Indulge in the authentic taste of our premium selection. Crafted with time-honored recipes and the finest spices, this snack represents the true essence of Indian savory traditions."}
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 md:py-10 border-y border-black/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <ShieldCheck size={24} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs md:text-sm text-primary uppercase tracking-tight">Pure Quality</h4>
                                    <p className="text-[10px] md:text-xs text-dark/40">FSSAI Certified Unit</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-accent/5 flex items-center justify-center text-accent shadow-sm shrink-0">
                                    <Truck size={24} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs md:text-sm text-accent uppercase tracking-tight">Bulk Ready</h4>
                                    <p className="text-[10px] md:text-xs text-dark/40">Dispatch in 24-48h</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-4">
                            <a
                                href={`https://wa.me/919904221111?text=Hello,%20I'm%20interested%20in%20buying%20${encodeURIComponent(product.name)}.%20Please%20provide%20bulk%20pricing.`}
                                target="_blank"
                                className="bg-primary text-secondary font-bold py-6 px-10 rounded-xl transition-all duration-500 shadow-premium hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden text-xl"
                            >
                                <span>Order on WhatsApp</span>
                                <ShoppingBag size={24} />
                            </a>
                            <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-dark/30">
                                <span>Distributor Network</span>
                                <div className="w-1 h-1 rounded-full bg-dark/20"></div>
                                <span>Export Quality</span>
                                <div className="w-1 h-1 rounded-full bg-dark/20"></div>
                                <span>Bulk Packaging</span>
                            </div>
                        </div>

                        {/* Customer Reviews for this Product */}
                        {product.reviews && product.reviews.length > 0 && (
                            <div className="pt-10 border-t border-black/5 mt-10">
                                <h3 className="text-2xl font-playfair font-bold text-primary mb-6">Customer Reviews</h3>
                                <div className="space-y-4">
                                    {product.reviews.map(review => (
                                        <div key={review.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/5 shadow-sm">
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="text-accent fill-accent" />)}
                                            </div>
                                            <p className="text-dark/70 italic text-base mb-4 leading-relaxed">"{review.text}"</p>
                                            <p className="font-bold text-primary text-xs uppercase tracking-widest">{review.author}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}
