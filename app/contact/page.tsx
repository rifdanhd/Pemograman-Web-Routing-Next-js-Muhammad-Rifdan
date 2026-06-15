'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// KOMPONEN MODAL SUKSES (Memenuhi syarat tugas menggunakan useState untuk show modal)
function SuccessModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: overlayRef });

  // Animasi masuk menggunakan GSAP
  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0, backdropFilter: 'blur(0px)' }, { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.4 });
    gsap.fromTo(modalRef.current, { scale: 0.8, y: 50, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' });
  }, []);

  // Animasi keluar sebelum komponen di-unmount
  const handleClose = contextSafe(() => {
    gsap.to(modalRef.current, { scale: 0.9, y: 20, opacity: 0, duration: 0.3, ease: 'power3.in' });
    gsap.to(overlayRef.current, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3, ease: 'power2.in', onComplete: onClose });
  });

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40" onClick={handleClose}>
      <div ref={modalRef} className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-stone-100" onClick={e => e.stopPropagation()}>
        {/* Ikon Checkmark SVG Klasik (Tanpa Emoji) */}
        <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-black text-stone-900 mb-3">Pesan Terkirim!</h3>
        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
          Terima kasih telah menghubungi saya. Saya akan segera membalas email Anda dalam 1-2 hari kerja.
        </p>
        <button onClick={handleClose} className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3.5 rounded-xl font-semibold transition-transform hover:scale-[1.02]">
          Tutup
        </button>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Animasi Masuk Halaman (GSAP Timeline)
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.contact-header', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    
    tl.fromTo('.contact-card-left',
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );
    
    tl.fromTo('.contact-card-right',
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      '-=0.6'
    );
  }, { scope: containerRef });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email tidak valid';
    if (!form.subject.trim()) e.subject = 'Subjek wajib diisi';
    if (form.message.trim().length < 10) e.message = 'Pesan terlalu pendek (min 10 karakter)';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    
    // Simulasi pengiriman pesan
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const socials = [
    { label: 'GitHub', handle: '@rifdanhd', href: 'https://github.com/rifdanhd' },
    { label: 'Instagram', handle: '@idanderrrrr', href: 'https://www.instagram.com/idanderrrrr/' },
    { label: 'TikTok', handle: '@situkanglaser', href: 'https://www.tiktok.com/@situkanglaser' },
    { label: 'LinkedIn', handle: '/in/rifdandermawan', href: '#' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans antialiased pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 contact-header">
          <span className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full mb-4 inline-block">Kontak</span>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mt-2 mb-4 tracking-tight">
            Mari Berkolaborasi.
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto text-lg leading-relaxed">
            Punya proyek menarik? Butuh developer handal? Atau sekedar ingin berdiskusi soal teknologi? Jangan ragu untuk mengirim pesan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Kolom Kiri: Form Input */}
          <div className="lg:col-span-7 contact-card-left">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-stone-100 shadow-sm">
              <h2 className="text-2xl font-black text-stone-900 mb-8">Kirim Pesan</h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-bold text-stone-600 mb-2 block">Nama Lengkap</label>
                    <input
                      className="w-full px-5 py-3.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                      placeholder="Masukkan nama Anda"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-bold text-stone-600 mb-2 block">Alamat Email</label>
                    <input
                      type="email"
                      className="w-full px-5 py-3.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                      placeholder="nama@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-stone-600 mb-2 block">Subjek</label>
                  <input
                    className="w-full px-5 py-3.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                    placeholder="Tawaran Proyek / Pertanyaan"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.subject}</p>}
                </div>

                <div>
                  <label className="text-sm font-bold text-stone-600 mb-2 block">Pesan Detail</label>
                  <textarea
                    className="w-full px-5 py-3.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm resize-none"
                    placeholder="Ceritakan detail proyek atau hal yang ingin didiskusikan..."
                    rows={6}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-xl font-bold mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    'Kirim Pesan Sekarang'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Info Card */}
            <div className="contact-card-right bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
              <h2 className="text-xl font-black text-stone-900 mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                {[
                  { label: 'Alamat Email', value: 'rifdandermawan252@gmail.com' },
                  { label: 'Telepon / WhatsApp', value: '+62 8960-1297-9385' },
                  { label: 'Lokasi Domisili', value: 'Bandung, Jawa Barat, Indonesia' },
                  { label: 'Waktu Respon', value: '1-2 Hari Kerja' },
                ].map(item => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">{item.label}</span>
                    <span className="text-sm font-semibold text-stone-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="contact-card-right bg-indigo-600 rounded-3xl p-8 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse border-2 border-indigo-600 box-content" />
                <span className="text-white font-bold tracking-wide">Available for Work</span>
              </div>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                Saya saat ini terbuka untuk proyek freelance, kolaborasi, dan peluang pekerjaan full-time.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Freelance', 'Remote', 'Full-time'].map(t => (
                  <span key={t} className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-semibold backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="contact-card-right bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
              <h3 className="text-lg font-black text-stone-900 mb-4">Media Sosial</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="flex flex-col p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 hover:shadow-sm border border-stone-100 transition-all group"
                  >
                    <span className="text-xs font-bold text-stone-400 mb-1 group-hover:text-indigo-600 transition-colors">{s.label}</span>
                    <span className="text-sm font-semibold text-stone-800 truncate">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Render modal saat state success true */}
      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </div>
  );
}