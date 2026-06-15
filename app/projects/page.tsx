'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  title: string;
  desc: string;
  longDesc: string;
  tech: string[];
  category: string;
  live: string;
  github: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Website EKSAVAPOR',
    desc: 'Website resmi brand vape lokal EKSAVAPOR dengan fitur katalog produk, company profile, dan contact form.',
    longDesc: 'Dibangun menggunakan Laravel sebagai backend dan Tailwind CSS untuk tampilan. Fitur meliputi katalog produk interaktif, halaman company profile, contact form dengan notifikasi email, serta admin panel untuk manajemen konten.',
    tech: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'JavaScript'],
    category: 'Web',
    live: '#',
    github: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Portfolio Website',
    desc: 'Website portfolio personal dengan desain modern, animasi halus, dan CMS sederhana untuk manage proyek.',
    longDesc: 'Platform portfolio yang dibangun dengan Next.js App Router dan Laravel sebagai API backend. Memiliki fitur animasi scroll, dark mode, contact form terintegrasi, dan admin panel untuk mengelola proyek dan skills.',
    tech: ['Next.js', 'Laravel', 'Tailwind CSS', 'TypeScript', 'MySQL'],
    category: 'Web',
    live: '#',
    github: '#',
    featured: true,
  },
  {
    id: 7,
    title: 'Website Saung Angklung Udjo',
    desc: 'Platform informasi dan pelestarian budaya digital untuk pusat kebudayaan Saung Angklung Udjo.',
    longDesc: 'Website profil resmi yang berfungsi sebagai pusat informasi jadwal pertunjukan, edukasi instrumen tradisional bambu, sejarah Saung Angklung Udjo, serta akses layanan bagi pengunjung lokal maupun mancanegara.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    category: 'Web',
    live: 'https://angklung-udjo.co.id/',
    github: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Aplikasi Kasir Flutter',
    desc: 'Aplikasi kasir mobile cross-platform untuk UMKM dengan fitur transaksi, laporan, dan manajemen stok.',
    longDesc: 'Dibuat menggunakan Flutter dan Dart dengan arsitektur BLoC untuk state management. Mendukung multiple payment method, cetak struk via Bluetooth printer, laporan penjualan harian/bulanan, dan backup data ke cloud.',
    tech: ['Flutter', 'Dart', 'Firebase', 'BLoC'],
    category: 'Mobile',
    live: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Brand Kit EKSAVAPOR',
    desc: 'Sistem identitas visual lengkap untuk brand EKSAVAPOR — logo, packaging, social media template, dan banner event.',
    longDesc: 'Desain brand identity menyeluruh mulai dari logo redesign, panduan warna dan tipografi, template packaging produk, aset media sosial (feed, story, highlight cover), hingga desain banner dan flyer event.',
    tech: ['CorelDRAW', 'Canva', 'Figma', 'Photoshop'],
    category: 'Design',
    live: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'Sistem Manajemen Event',
    desc: 'Web app untuk manajemen event kampus dengan fitur pendaftaran peserta, jadwal, dan tiket digital.',
    longDesc: 'Dibangun sebagai proyek kuliah dengan Laravel dan MySQL. Fitur utama: registrasi peserta online, QR code tiket digital, jadwal sesi real-time, dashboard admin untuk manajemen peserta, dan ekspor laporan ke PDF/Excel.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    category: 'Web',
    live: '#',
    github: '#',
  },
  {
    id: 6,
    title: 'To-Do App Flutter',
    desc: 'Aplikasi manajemen tugas mobile dengan kategori, reminder, dan sync cloud untuk produktivitas harian.',
    longDesc: 'Aplikasi Flutter dengan desain Material 3 yang mendukung kategorisasi tugas, notifikasi reminder, dark/light mode, sinkronisasi data via Firebase Firestore, dan widget home screen untuk akses cepat.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Hive'],
    category: 'Mobile',
    live: '#',
    github: '#',
  },
];

const categories = ['Semua', 'Web', 'Mobile', 'Design'];

// MODAL DETAIL PROYEK (Syarat Tugas)
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const isExternal = project.live.startsWith('http');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: overlayRef });

  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0, backdropFilter: 'blur(0px)' }, { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.4 });
    gsap.fromTo(modalRef.current, { scale: 0.9, y: 30, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' });
  }, []);

  const handleClose = contextSafe(() => {
    gsap.to(modalRef.current, { scale: 0.95, y: -20, opacity: 0, duration: 0.3, ease: 'power3.in' });
    gsap.to(overlayRef.current, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3, ease: 'power2.in', onComplete: onClose });
  });

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40" onClick={handleClose}>
      <div ref={modalRef} className="bg-white rounded-3xl p-8 md:p-10 max-w-xl w-full shadow-2xl border border-stone-100" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 rounded-full mb-3 inline-block">{project.category}</span>
            <h3 className="text-2xl font-black text-stone-900 leading-tight">{project.title}</h3>
          </div>
          <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200">✕</button>
        </div>
        <p className="text-stone-600 leading-relaxed mb-8 text-sm md:text-base">{project.longDesc}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1.5 text-xs font-medium bg-stone-100 text-stone-600 rounded-lg">{t}</span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={project.live} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex-1 bg-stone-900 hover:bg-stone-800 text-white py-3.5 rounded-xl font-semibold text-center text-sm">Kunjungi Website ↗</a>
          <a href={project.github} className="flex-1 bg-white border-2 border-stone-200 text-stone-700 py-3.5 rounded-xl font-semibold text-center text-sm">Lihat Repository</a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('Semua');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'Semua' ? projects : projects.filter(p => p.category === filter);

  useGSAP(() => {
    // Animasi header muncul
    gsap.fromTo('.project-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    
    // Animasi kartu proyek dengan scrolltrigger dan perubahan filter
    gsap.fromTo('.project-card', 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' } }
    );
  }, { scope: containerRef, dependencies: [filter] });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans antialiased pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto projects-grid">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 project-header">
          <div className="max-w-2xl">
            <span className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full mb-4 inline-block">Portofolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4 mt-2">Karya Pilihan.</h2>
            <p className="text-stone-500 text-lg">Eksplorasi teknikal dan solusi kreatif yang telah saya bangun untuk berbagai kebutuhan industri.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-stone-200/80 shadow-sm self-start">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  filter === cat ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filtered.map((p) => (
            <div key={p.id} onClick={() => setActiveProject(p)}
              className="project-card group cursor-pointer bg-white rounded-[2rem] p-8 md:p-10 border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500">
              <div className="flex justify-between items-start mb-16">
                <span className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-stone-50 text-stone-500 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {p.category}
                </span>
                {p.featured && <span className="text-xl">🌟</span>}
              </div>
              
              <h3 className="font-black text-2xl md:text-3xl text-stone-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                {p.title}
              </h3>
              <p className="text-stone-500 text-base leading-relaxed mb-8 line-clamp-2">
                {p.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.slice(0, 3).map(t => <span key={t} className="px-3 py-1.5 text-xs font-semibold bg-stone-100 text-stone-600 rounded-lg">{t}</span>)}
                {p.tech.length > 3 && <span className="px-3 py-1.5 text-xs font-semibold bg-stone-100 text-stone-600 rounded-lg">+{p.tech.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  );
}