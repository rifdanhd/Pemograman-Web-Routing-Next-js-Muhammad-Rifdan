'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
      style={{
        background: scrolled ? 'rgba(15, 15, 15, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderColor: scrolled ? 'rgba(255,255,255,0.1)' : 'transparent',
      }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-black tracking-tight cursor-pointer gradient-text">
          &lt;Rifdan /&gt;
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.label} href={l.href}
              className={`text-sm font-medium transition-colors cursor-pointer nav-link ${pathname === l.href ? 'text-[#a5b4fc]' : 'text-stone-400'}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" 
            className="btn-primary px-5 py-2 rounded-full text-white text-sm font-semibold cursor-pointer">
            Hire Me
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-stone-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-stone-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-stone-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-lg border-t border-white/10 px-6 py-6 flex flex-col gap-4 animate-fade-in">
          {links.map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors cursor-pointer ${pathname === l.href ? 'text-[#a5b4fc]' : 'text-stone-300'}`}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}