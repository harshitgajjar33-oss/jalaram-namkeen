"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2, CheckCircle, ArrowLeft, Package, CreditCard, Tag, Image as ImageIcon, FileText, Lock, X, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Namkeen",
    price: "",
    description: "",
    imageUrl: "", // Main image
  });

  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "0089") {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setAdminKey("");
    }
  };

  const addImage = () => {
    if (newImageUrl && !additionalImages.includes(newImageUrl)) {
      setAdditionalImages([...additionalImages, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const removeImage = (url: string) => {
    setAdditionalImages(additionalImages.filter(img => img !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/food-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          password: adminKey, // Use the stored admin key
          price: parseFloat(formData.price),
          images: additionalImages
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", category: "Namkeen", price: "", description: "", imageUrl: "" });
        setAdditionalImages([]);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="bg-primary min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-accent rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-12">
              <Lock size={40} className="text-white -rotate-12" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/40">Enter Management Key to continue</p>
          </div>

          <form onSubmit={handleLogin} className="glass-card !bg-white/10 !border-white/10 !p-8 space-y-6 backdrop-blur-3xl">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Secret Key</label>
              <input
                type="password"
                required
                autoFocus
                className={`w-full bg-white/5 border ${loginError ? 'border-red-400' : 'border-white/10'} rounded-2xl py-4 px-6 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-accent transition-all`}
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="••••"
              />
              {loginError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs text-center mt-2 font-bold"
                >
                  Access Denied. Invalid Key.
                </motion.p>
              )}
            </div>
            <button type="submit" className="btn-premium w-full !bg-white !text-primary hover:!bg-accent hover:!text-white">
              Unlock Dashboard
            </button>
            <Link href="/" className="block text-center text-white/30 hover:text-white text-sm transition-colors">
              Return to Website
            </Link>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-cream min-h-screen pt-32 pb-24 text-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-4 font-bold uppercase tracking-widest text-xs">
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-primary">Content <span className="text-accent italic">Dashboard</span></h1>
              <p className="text-dark/40 mt-2">Premium Catalog Management</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsAuthenticated(false)} className="btn-outline !bg-red-50 !text-red-600 !border-red-100 py-3 px-6 text-sm">
                Logout
              </button>
              <Link href="/products" className="btn-outline py-3 px-6 text-sm">
                View Catalog
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card !bg-white !p-10 space-y-8">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Snack Name</label>
                    <div className="relative">
                      <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20" size={18} />
                      <input
                        type="text"
                        required
                        className="w-full bg-cream/30 border border-black/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                        placeholder="e.g. Masala Gathiya"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Category</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20" size={18} />
                      <select
                        className="w-full bg-cream/30 border border-black/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent focus:bg-white transition-all appearance-none shadow-sm"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option>Namkeen</option>
                        <option>Wafers</option>
                        <option>Sweet</option>
                        <option>Specialty</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Price (₹)</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20" size={18} />
                      <input
                        type="number"
                        required
                        step="0.01"
                        className="w-full bg-cream/30 border border-black/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                        placeholder="450.00"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Thumbnail URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20" size={18} />
                      <input
                        type="text"
                        required
                        className="w-full bg-cream/30 border border-black/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                        placeholder="Main product image link"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Images Section */}
                <div className="space-y-4 pt-4 border-t border-black/5">
                  <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Product Gallery (Additional Photos)</label>
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20" size={18} />
                      <input
                        type="text"
                        className="w-full bg-cream/30 border border-black/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                        placeholder="Paste additional image URL"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addImage}
                      className="bg-primary text-white px-6 rounded-2xl hover:bg-accent transition-colors shadow-premium"
                    >
                      <Plus size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <AnimatePresence>
                      {additionalImages.map((url, index) => (
                        <motion.div
                          key={url}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative aspect-square rounded-xl overflow-hidden group shadow-md"
                        >
                          <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(url)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/60 uppercase tracking-widest pl-1">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-6 text-dark/20" size={18} />
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-cream/30 border border-black/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent focus:bg-white transition-all resize-none shadow-sm"
                      placeholder="Describe the flavor, spices, and texture..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium w-full !py-6 text-lg disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={24} className="animate-spin text-secondary" />
                  ) : success ? (
                    <>
                      <CheckCircle size={24} className="text-secondary" />
                      <span>Product Added Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Securely Publish Catalog Item</span>
                      <Plus size={24} className="text-secondary" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="glass-card !bg-primary !text-white !p-8">
                <h4 className="font-bold text-accent mb-4 uppercase tracking-widest text-xs">Security Status: Active</h4>
                <p className="text-sm text-white/70 mb-4">You are currently logged in as an administrator. Your session is active.</p>

                <h4 className="font-bold text-accent mb-2 uppercase tracking-widest text-xs">Gallery Tips</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex gap-3">
                    <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-1.5"></div>
                    Add up to 4-6 high-quality photos.
                  </li>
                  <li className="flex gap-3">
                    <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-1.5"></div>
                    Show packaging, close-ups of texture, and serving suggestions.
                  </li>
                </ul>
              </div>

              <div className="glass-card !p-8 bg-white/50 border-dashed border-2 border-primary/20 flex flex-col items-center">
                <div className="w-24 h-24 mb-4 rounded-2xl overflow-hidden border border-black/5">
                  <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <p className="text-dark/40 text-[10px] text-center uppercase tracking-widest">Authorized Management Portal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
