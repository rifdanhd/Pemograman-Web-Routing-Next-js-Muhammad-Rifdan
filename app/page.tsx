'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrasi GSAP Plugins
gsap.registerPlugin(TextPlugin);

const TYPED_WORDS = ['Mobile Developer.', 'Web Developer.', 'UI Designer.', 'Problem Solver.'];

// 1. ANIMASI TYPED TEXT
function TypedText() {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;
    const tl = gsap.timeline({ repeat: -1 });

    TYPED_WORDS.forEach((word) => {
      tl.to(textRef.current, {
        duration: word.length * 0.1,
        text: word,
        ease: 'none',
      })
      .to({}, { duration: 1.2 }) 
      .to(textRef.current, {
        duration: word.length * 0.05,
        text: '',
        ease: 'none',
      })
      .to({}, { duration: 0.3 }); 
    });
  }, []);

  return (
    <span className="relative inline-block text-indigo-600 font-bold">
      <span ref={textRef}></span>
      <span className="absolute -right-2 top-0 bottom-0 w-[2px] bg-indigo-600 animate-blink"></span>
    </span>
  );
}

// 2. STATISTIK MODAL (Memenuhi syarat tugas menggunakan useState untuk modal)
function StatsModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: overlayRef });

  const stats = [
    { label: 'Proyek Selesai', value: '10+' },
    { label: 'Tahun Coding', value: '3+' },
    { label: 'Tech Dikuasai', value: '12+' },
    { label: 'Tahun Kerja', value: '5' },
  ];

  // Animasi masuk modal
  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' });
    gsap.fromTo('.stat-card', 
      { y: 30, opacity: 0, scale: 0.9 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)', delay: 0.2 }
    );
  }, []);

  // Animasi keluar sebelum modal ditutup
  const handleClose = contextSafe(() => {
    gsap.to(modalRef.current, { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  });

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm" onClick={handleClose}>
      <div ref={modalRef} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-100" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black text-stone-900">Statistik Angka</h3>
          <button onClick={handleClose} className="text-stone-400 hover:text-stone-900 text-xl font-bold">✕</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="stat-card bg-stone-50 border border-stone-100 rounded-2xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-black text-indigo-600 mb-1">{s.value}</div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. KOMPONEN UTAMA HOME PAGE
export default function HomePage() {
  const [showModal, setShowModal] = useState(false); // State untuk modal
  
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Animasi Masuk Halaman (GSAP Timeline)
  useGSAP(() => {
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('.hero-text-item', 
      { y: 60, opacity: 0, rotateX: -15 }, 
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15, ease: 'expo.out', transformOrigin: 'top center' }, 
      0.2
    );
    
    heroTl.fromTo('.hero-photo-wrapper', 
      { scale: 0.8, opacity: 0, rotate: -5 }, 
      { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: 'elastic.out(1, 0.7)' }, 
      0.4
    );
    
    gsap.fromTo('.service-card', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 1 }
    );
  }, { scope: containerRef });

  // Efek Parallax 3D Saat Mouse Bergerak di Atas Foto
  useEffect(() => {
    const photoElement = photoRef.current;
    if (!photoElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = photoElement.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      gsap.to(photoElement, { rotateX: -(mouseY / 20), rotateY: mouseX / 20, x: mouseX / 15, y: mouseY / 15, duration: 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(photoElement, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    };

    photoElement.addEventListener('mousemove', handleMouseMove);
    photoElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      photoElement.removeEventListener('mousemove', handleMouseMove);
      photoElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans antialiased overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Latar Belakang Abstrak */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-100/80 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 -z-10" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Kolom Kiri: Teks */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <div className="hero-text-item inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-stone-200/60 rounded-full px-5 py-2 text-xs font-bold text-stone-600 mb-8 uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Tersedia untuk Pekerjaan Baru
            </div>
            
            <h1 className="hero-text-item text-[3rem] sm:text-[4rem] lg:text-[5.5rem] font-black tracking-tighter text-stone-900 leading-[1.05] mb-6">
              Membangun <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-indigo-800 to-stone-900">Produk Digital</span>
            </h1>
            
            <div className="hero-text-item text-xl md:text-3xl font-medium text-stone-500 mb-8 tracking-tight">
              Saya seorang <TypedText />
            </div>
            
            <p className="hero-text-item text-base md:text-lg text-stone-600 max-w-xl mb-10 leading-relaxed font-medium">
              Fokus merancang arsitektur aplikasi <span className="text-stone-900 font-bold">Mobile (Flutter)</span> dan ekosistem <span className="text-stone-900 font-bold">Web (Next.js/Laravel)</span> yang modern, mulus, dan scalable.
            </p>

            {/* Tombol Aksi (CTA) */}
            <div className="hero-text-item flex flex-wrap gap-4 justify-center lg:justify-start w-full">
              {/* Tombol ini akan berpindah (routing) ke halaman /about */}
              <Link href="/about" className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/20">
                Lihat Profil Lengkap
              </Link>
              
              {/* Tombol ini akan memicu useState untuk membuka modal statistik */}
              <button onClick={() => setShowModal(true)} className="bg-white border-2 border-stone-200 hover:border-stone-300 text-stone-800 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-1">
                Angka & Statistik
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Foto Profil */}
          <div className="lg:col-span-5 flex justify-center items-center relative lg:h-[600px] mt-10 lg:mt-0">
            <div 
              ref={photoRef} 
              className="hero-photo-wrapper relative w-72 h-72 sm:w-96 sm:h-96 rounded-[2.5rem] p-2 bg-white shadow-2xl shadow-indigo-900/10 border border-stone-100" 
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-stone-200">
                <img src="/images/profile.jpeg" alt="Muhammad Rifdan" className="w-full h-full object-cover scale-105" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl shadow-stone-900/10 border border-stone-100 transform -rotate-6">
                <div className="text-3xl font-black text-indigo-600 leading-none">3+</div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Tahun Pengalaman</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto service-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Mobile App', desc: 'Pembuatan aplikasi iOS & Android performa tinggi dengan arsitektur Flutter yang solid.' },
              { num: '02', title: 'Web App', desc: 'Website perusahaan hingga platform SaaS kompleks menggunakan Next.js dan Laravel.' },
              { num: '03', title: 'UI/UX Design', desc: 'Desain visual yang tidak hanya indah, tapi juga memikirkan pengalaman pengguna.' },
            ].map((card, i) => (
              <div key={i} className="service-card bg-white rounded-3xl p-8 border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-stone-300 font-black text-4xl mb-6">{card.num}</div>
                <h3 className="font-bold text-xl text-stone-900 mb-3">{card.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render Modal Statistik saat tombol di-klik (Berdasarkan useState) */}
      {showModal && <StatsModal onClose={() => setShowModal(false)} />}
    </div>
  );
}