'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Exp = { 
  title: string; 
  company: string; 
  period: string; 
  type: string; 
  points: string[] 
};

const skills = [
  { name: 'Flutter / Dart', level: 85, color: '#4f46e5' }, 
  { name: 'Laravel / PHP', level: 80, color: '#7c3aed' }, 
  { name: 'HTML / CSS', level: 90, color: '#db2777' }, 
  { name: 'JavaScript', level: 75, color: '#4f46e5' },
  { name: 'Tailwind CSS', level: 88, color: '#7c3aed' },
  { name: 'MySQL', level: 72, color: '#db2777' },
  { name: 'Figma / Canva', level: 82, color: '#4f46e5' },
  { name: 'Git', level: 78, color: '#7c3aed' },
];

const allSkills = [
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
];

const timeline = [
  { year: '2020', title: 'Mulai di EKSAVAPOR', desc: 'Bergabung sebagai Content Creator & IT Support di brand vape lokal EKSAVAPOR.' },
  { year: '2021', title: 'Belajar Design', desc: 'Mulai serius belajar CorelDRAW, Canva, dan Figma untuk kebutuhan branding digital.' },
  { year: '2022', title: 'Web Development', desc: 'Membangun website resmi EKSAVAPOR dan mulai belajar Laravel & PHP.' },
  { year: '2023', title: 'Kuliah di UTB', desc: 'Masuk program Teknik Informatika di Universitas Teknologi Bandung.' },
  { year: '2024', title: 'Mobile Dev', desc: 'Eksplorasi Flutter & Dart untuk pengembangan aplikasi mobile cross-platform.' },
  { year: '2025', title: 'Full Stack Journey', desc: 'Mengerjakan proyek fullstack dan aktif mengembangkan portfolio.' },
];

const experiences: Exp[] = [
  {
    company: 'EKSAVAPOR',
    title: 'Content Creator & IT Support',
    period: '2020 – 2025',
    type: 'Brand Produk Vape Lokal',
    points: [
      'Web Development – Membangun dan maintain website resmi brand EKSAVAPOR',
      'Digital Design – Membuat konten visual menggunakan CorelDRAW & Canva',
      'Brand Ambassador – Representasi brand di event dan kegiatan marketing',
      'Technical Production – Pengoperasian mesin laser untuk produksi',
      'Social Media Management – Mengelola konten media sosial brand',
    ],
  },
];

// MODAL DETAIL PENGALAMAN (Syarat Tugas)
function ExpModal({ exp, onClose }: { exp: Exp; onClose: () => void }) {
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
      <div ref={modalRef} className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-stone-100" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black text-stone-900">{exp.company}</h3>
            <p className="text-indigo-600 font-semibold">{exp.title}</p>
            <span className="px-3 py-1 text-xs font-bold bg-stone-100 text-stone-600 rounded-full mt-2 inline-block">{exp.period}</span>
          </div>
          <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200">✕</button>
        </div>
        <ul className="space-y-3 mt-4 mb-8">
          {exp.points.map((p, i) => (
            <li key={i} className="flex gap-3 text-sm text-stone-600 leading-relaxed">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>{p}
            </li>
          ))}
        </ul>
        <button onClick={handleClose} className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3.5 rounded-xl font-semibold text-sm">Tutup</button>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [activeExp, setActiveExp] = useState<Exp | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.about-fade', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
    
    gsap.fromTo('.skill-fill',
      { width: '0%' },
      { width: (i, el) => el.dataset.width, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: '.skills-container', start: 'top 85%' } }
    );

    gsap.fromTo('.tech-icon',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.tech-container', start: 'top 85%' } }
    );

    gsap.fromTo('.timeline-item',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: '.timeline-container', start: 'top 85%' } }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans antialiased pt-28 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-20 about-fade">
          <span className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full mb-4 inline-block">Tentang Saya</span>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 mt-2 mb-6">Mengenal Lebih Jauh.</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Mahasiswa Teknik Informatika yang passionate di Mobile & Web Development, dengan pengalaman nyata di industri kreatif digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="about-fade bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-100 shadow-sm">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-indigo-50 flex items-center justify-center text-6xl shadow-inner border border-indigo-100">👨‍💻</div>
              <div className="absolute -bottom-3 -right-3 bg-white border border-stone-100 shadow-md rounded-xl px-4 py-1.5 text-xs font-bold text-emerald-600">● Tersedia</div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { label: 'Nama Lengkap', value: 'Muhammad Rifdan Dermawan' },
                { label: 'Domisili', value: 'Bandung, Indonesia' },
                { label: 'Email', value: 'rifdandermawan252@gmail.com' },
                { label: 'Telepon', value: '+62 8960-1297-9385' },
              ].map(item => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:gap-3 text-sm border-b border-stone-100 pb-3 last:border-0">
                  <span className="text-stone-400 font-medium w-32 shrink-0 mb-1 sm:mb-0">{item.label}</span>
                  <span className="text-stone-800 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary px-6 py-3 rounded-full text-white text-sm font-semibold inline-block">Hubungi Saya</Link>
          </div>

          <div className="about-fade flex flex-col justify-center">
            <h3 className="text-2xl font-black text-stone-900 mb-4">Biografi Singkat</h3>
            <p className="text-stone-600 leading-relaxed mb-4 text-base md:text-lg">
              Saya adalah mahasiswa <span className="text-indigo-600 font-bold">Teknik Informatika</span> di Universitas Teknologi Bandung dengan fokus utama pada <span className="text-indigo-600 font-bold">Mobile Development</span> dan <span className="text-indigo-600 font-bold">Web Development</span>.
            </p>
            <p className="text-stone-600 leading-relaxed mb-10 text-base md:text-lg">
              Selain berkuliah, saya memiliki pengalaman praktis selama lebih dari 3 tahun berkarir di EKSAVAPOR sebagai Content Creator & IT Support.
            </p>

            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">Pendidikan 🎓</h3>
            <div className="bg-white border border-stone-100 shadow-sm rounded-2xl p-6 mb-8 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-stone-900 text-base">Universitas Teknologi Bandung</h4>
                  <p className="text-indigo-600 font-medium text-sm mt-0.5">S1 Teknik Informatika</p>
                </div>
                <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-bold">2023 – Skrg</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">Pengalaman Kerja 💼</h3>
            {experiences.map((exp, i) => (
              <button key={i} onClick={() => setActiveExp(exp)}
                className="w-full bg-white border border-stone-100 hover:border-indigo-200 shadow-sm rounded-2xl p-6 text-left hover:shadow-md transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-indigo-50 group-hover:scale-110">🏢</div>
                <div className="flex-1">
                  <div className="text-base font-black text-stone-900">{exp.company}</div>
                  <div className="text-sm font-semibold text-indigo-600">{exp.title}</div>
                </div>
                <span className="text-stone-400 group-hover:text-indigo-600 transition-colors">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-24 skills-container">
          <h3 className="text-3xl font-black text-stone-900 mb-10 text-center">Tingkat Keahlian</h3>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-stone-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {skills.map((skill, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-stone-700">{skill.name}</span>
                  <span className="text-stone-400">{skill.level}%</span>
                </div>
                <div className="h-3 rounded-full bg-stone-100 overflow-hidden">
                  <div className="skill-fill h-full rounded-full" data-width={`${skill.level}%`} style={{ backgroundColor: skill.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 tech-container">
          <h3 className="text-3xl font-black text-stone-900 mb-10 text-center">Teknologi & Tools</h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {allSkills.map((s, i) => (
              <div key={i} className="tech-icon group flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-white border border-stone-100 shadow-sm rounded-2xl flex items-center justify-center hover:-translate-y-2 p-4">
                  <img src={s.icon} alt={s.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <span className="text-xs font-bold text-stone-400 group-hover:text-stone-900 transition-colors">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-container max-w-3xl mx-auto">
          <h3 className="text-3xl font-black text-stone-900 mb-12 text-center">Perjalanan Saya</h3>
          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 transform md:-translate-x-1/2" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <div key={i} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-[-5px] md:left-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-[#FDFBF7] transform md:-translate-x-1/2 mt-1.5 md:mt-0 z-10" />
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                    <span className="px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-stone-200 text-stone-600 rounded-md inline-block mb-3">{t.year}</span>
                    <h4 className="font-black text-xl text-stone-900 mb-2">{t.title}</h4>
                    <p className="text-sm text-stone-500 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {activeExp && <ExpModal exp={activeExp} onClose={() => setActiveExp(null)} />}
    </div>
  );
}