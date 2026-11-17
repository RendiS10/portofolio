import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ArrowUp,
  RotateCw,
  MessageCircle,
  FileText
} from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { profileData } from '../../data/portfolioData';
import { ContactOceanCanvas } from './ContactOceanCanvas';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const inquiryTopics = [
  { id: 'web', label: 'Full-Stack Web', subject: 'Inquiry: Full-Stack Web Development' },
  { id: 'mobile', label: 'Mobile App (Flutter)', subject: 'Inquiry: Flutter Mobile App' },
  { id: 'collab', label: 'Diskusi Santai', subject: 'Inquiry: Collaboration & Discussion' }
];

export const ContactSection: React.FC = () => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const { copied, copy } = useClipboard();
  const [selectedTopic, setSelectedTopic] = useState(inquiryTopics[0]);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [snippetCopied, setSnippetCopied] = useState<boolean>(false);

  const recruiterSnippet = `Rendi Sutendi — Full-Stack & Mobile Software Engineer
• Pendidikan: S1 Teknik Informatika (IPK 3.70 / 4.00), STMIK Mardira Indonesia
• Pengalaman: E-Commerce & Retail Produksi (Next.js SSR, Flutter Clean Arch, NestJS/Node.js, Midtrans Gateway), Abby & Gail, Dinas Cipta Bintar Kota Bandung
• Tech Stack: React, Next.js, Flutter, TypeScript, Node.js, Laravel, PostgreSQL, MySQL, Docker, Linux/NixOS
• Portofolio: https://rendisutendi.id
• Email: ${profileData.contact.email} | WA: ${profileData.contact.whatsapp?.replace('https://wa.me/', '+') || '+62 857-2145-1615'} | GitHub: ${profileData.contact.github}`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(recruiterSnippet);
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 3000);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('id-ID', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mailtoLink = `mailto:${profileData.contact.email}?subject=${encodeURIComponent(
    selectedTopic.subject
  )}&body=${encodeURIComponent(
    `Halo ${profileData.name.split(' ')[0]},\n\nSaya ingin berdiskusi mengenai topik: ${selectedTopic.label}.\n\n[Tulis pesan Anda di sini]\n\nSalam,\n`
  )}`;

  return (
    <section
      id="contact"
      className={`relative z-20 w-full select-none pt-20 pb-0 overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      <ContactOceanCanvas isNight={isNight} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className={`p-6 sm:p-10 rounded-3xl border space-y-8 transition-all duration-500 ${
            isNight
              ? 'bg-[#111a14] border-emerald-500/20 shadow-2xl shadow-black/50'
              : 'bg-white border-[#e4ded5] shadow-xl shadow-stone-900/4'
          }`}
        >
          {/* Section Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono font-bold tracking-[0.25em] uppercase ${
                    isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                  }`}
                >
                  06 // KONTAK &amp; DISKUSI
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
              </div>

              <div
                className={`px-3 py-1 rounded-full border text-[11px] font-mono font-semibold flex items-center gap-1.5 ${
                  isNight
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Status: Terbuka untuk Kolaborasi</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight ${
                  isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'
                }`}
              >
                Mari Berdiskusi &amp; Berkolaborasi
              </h2>
              <p
                className={`text-xs sm:text-sm font-normal leading-relaxed max-w-2xl ${
                  isNight ? 'text-[#95a499]' : 'text-[#48564c]'
                }`}
              >
                Punya kebutuhan rekayasa web/mobile skala produksi, integrasi arsitektur sistem, atau peluang karier software engineer? Hubungi saya langsung melalui WhatsApp, Email, atau topik di bawah.
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Matrix & Unified Actions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left Column: Topic Selector & Decisive Actions */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="md:col-span-7 flex flex-col justify-between space-y-5"
            >
              {/* Topic Selector */}
              <div className="space-y-2.5">
                <label
                  className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                    isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                  }`}
                >
                  Pilih Topik Diskusi
                </label>
                <div className="flex flex-wrap gap-2">
                  {inquiryTopics.map((topic) => {
                    const isSelected = selectedTopic.id === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? isNight
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                              : 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
                            : isNight
                            ? 'bg-[#16221a] text-[#95a499] border-emerald-500/15 hover:text-white hover:border-emerald-500/30'
                            : 'bg-[#f4f1ea] text-[#48564c] border-[#e4ded5] hover:bg-[#ebf2ec] hover:text-[#151e17]'
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Decisive Actions Group */}
              <div className={`space-y-3.5 pt-4 border-t ${isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'}`}>
                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Primary CTA: WhatsApp */}
                  <a
                    href={profileData.contact.whatsapp || 'https://wa.me/6285721451615'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95 ${
                      isNight
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-[#090f0c]'
                        : 'bg-[#1b4332] hover:bg-[#143427] text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Chat WhatsApp</span>
                  </a>

                  {/* Secondary CTA: Email */}
                  <a
                    href={mailtoLink}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono font-semibold text-xs sm:text-sm transition-all cursor-pointer border ${
                      isNight
                        ? 'bg-[#16221a] hover:bg-[#1f3025] text-emerald-300 border-emerald-500/25'
                        : 'bg-[#fcfbf8] hover:bg-[#ebf2ec] text-[#1b4332] border-[#e4ded5]'
                    }`}
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>Kirim Email</span>
                  </a>
                </div>

                {/* Clean Inline Email Copy Pill */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => copy(profileData.contact.email)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer border ${
                      isNight
                        ? 'bg-[#152119] hover:bg-[#1b2b21] text-[#95a499] hover:text-white border-emerald-500/15'
                        : 'bg-[#f4f1ea] hover:bg-[#ebf2ec] text-[#48564c] hover:text-[#151e17] border-[#e4ded5]'
                    }`}
                    title="Klik untuk menyalin email"
                  >
                    <Mail className={`w-3.5 h-3.5 ${isNight ? 'text-emerald-400' : 'text-[#1b4332]'}`} />
                    <span>{profileData.contact.email}</span>
                    {copied ? (
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 ml-1">
                        <Check className="w-3 h-3" /> Tersalin
                      </span>
                    ) : (
                      <Copy className="w-3 h-3 opacity-60 ml-1" />
                    )}
                  </button>

                  {/* Recruiter Quick Snippet Button */}
                  <button
                    type="button"
                    onClick={handleCopySnippet}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer border ${
                      snippetCopied
                        ? isNight
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : isNight
                        ? 'bg-[#152119] hover:bg-[#1b2b21] text-[#95a499] hover:text-white border-emerald-500/15'
                        : 'bg-[#f4f1ea] hover:bg-[#ebf2ec] text-[#48564c] hover:text-[#151e17] border-[#e4ded5]'
                    }`}
                    title="Salin ringkasan singkat profil untuk diteruskan ke tim rekrutmen/internal"
                  >
                    <FileText className="w-3.5 h-3.5 opacity-70" />
                    <span>{snippetCopied ? 'Ringkasan Tersalin!' : 'Salin Ringkasan Kandidat'}</span>
                    {snippetCopied && <Check className="w-3 h-3 text-emerald-500" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Architectural Status & Social Hub */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{ perspective: '800px' }}
              className="md:col-span-5 min-h-[220px]"
            >
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 180, damping: 20 }}
                className="relative w-full h-full"
              >
                {/* Front Panel: Status, Clock & Direct Social Links */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className={`w-full h-full p-5 sm:p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                    isNight
                      ? 'bg-[#152119] border-emerald-500/20 shadow-sm'
                      : 'bg-[#fcfbf8] border-[#e4ded5] shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        isNight ? 'bg-[#111a14] border-emerald-500/20' : 'bg-white border-[#e4ded5]'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 text-xs font-mono font-medium ${
                          isNight ? 'text-emerald-300' : 'text-[#48564c]'
                        }`}
                      >
                        <Clock className={`w-3.5 h-3.5 ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`} />
                        <span>Waktu Lokal (WIB)</span>
                      </div>
                      <span
                        className={`text-sm font-mono font-bold tabular-nums ${
                          isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'
                        }`}
                      >
                        {currentTime || '16:00:00'}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-2 text-xs font-mono px-1 ${
                        isNight ? 'text-[#95a499]' : 'text-[#48564c]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Bandung, Jawa Barat • Remote &amp; Hybrid</span>
                    </div>
                  </div>

                  <div className={`space-y-2 pt-3 border-t ${isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'}`}>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span
                        className={`font-semibold uppercase tracking-wider ${
                          isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                        }`}
                      >
                        Kontak Langsung
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsFlipped(true)}
                        className={`inline-flex items-center gap-1 text-[11px] font-mono font-medium cursor-pointer transition-colors ${
                          isNight ? 'text-emerald-300 hover:text-white' : 'text-[#1b4332] hover:text-[#2d6a4f]'
                        }`}
                      >
                        <span>Filosofi Kode</span>
                        <RotateCw className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={profileData.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl font-mono text-xs transition-all border flex items-center justify-center gap-1.5 group ${
                          isNight
                            ? 'bg-[#111a14] hover:bg-[#1a2c20] text-stone-200 border-emerald-500/20'
                            : 'bg-white hover:bg-[#f4f1ea] text-[#151e17] border-[#e4ded5]'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                        <span>GitHub</span>
                      </a>

                      <a
                        href={profileData.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl font-mono text-xs transition-all border flex items-center justify-center gap-1.5 group ${
                          isNight
                            ? 'bg-[#111a14] hover:bg-[#1a2c20] text-stone-200 border-emerald-500/20'
                            : 'bg-white hover:bg-[#f4f1ea] text-[#151e17] border-[#e4ded5]'
                        }`}
                      >
                        <svg
                          className={`w-3.5 h-3.5 fill-current ${
                            isNight ? 'text-emerald-400' : 'text-[#1b4332]'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>LinkedIn</span>
                      </a>

                      <a
                        href={profileData.contact.whatsapp || 'https://wa.me/6285721451615'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl font-mono text-xs transition-all border flex items-center justify-center gap-1.5 group ${
                          isNight
                            ? 'bg-[#111a14] hover:bg-[#1a2c20] text-stone-200 border-emerald-500/20'
                            : 'bg-white hover:bg-[#ebf2ec] text-[#151e17] border-[#e4ded5]'
                        }`}
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WA</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Back Panel: Engineering Dedication */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                  className={`absolute inset-0 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between space-y-3 ${
                    isNight
                      ? 'bg-[#152119] border-emerald-500/20 shadow-sm'
                      : 'bg-white border-[#e4ded5] shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <span
                      className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
                        isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Prinsip Rekayasa</span>
                    </span>
                    <p
                      className={`text-xs sm:text-sm font-normal leading-relaxed ${
                        isNight ? 'text-[#c2ceb9]' : 'text-[#38433b]'
                      }`}
                    >
                      "Kode terbaik adalah kode yang terverifikasi, aman, dan memecahkan masalah nyata pengguna secara efisien tanpa komplikasi berlebih."
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isNight
                        ? 'bg-[#111a14] hover:bg-[#1f3025] text-stone-200 border-emerald-500/20'
                        : 'bg-[#f4f1ea] hover:bg-[#ebf2ec] text-[#151e17] border-[#e4ded5]'
                    }`}
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Kembali ke Panel Status</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Grounded Edge-to-Edge Footer */}
      <footer
        className={`w-full border-t transition-colors duration-500 py-6 px-4 sm:px-8 lg:px-12 ${
          isNight
            ? 'bg-[#060c08] border-emerald-500/15 text-[#95a499]'
            : 'bg-[#f5f3ec] border-[#e4ded5] text-[#48564c]'
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span className={isNight ? 'text-[#f5f7f4] font-semibold' : 'text-[#151e17] font-semibold'}>
              &copy; {new Date().getFullYear()} {profileData.name}
            </span>
            <span className="opacity-40">•</span>
            <span>Bandung, Indonesia</span>
            <span className="opacity-40 hidden sm:inline">•</span>
            <span className={isNight ? 'text-emerald-400' : 'text-[#1b4332]'}>
              Full-Stack &amp; Mobile Software Engineer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] opacity-70">
              {isNight ? 'Nuansa Malam Berkunang-kunang' : 'Nuansa Pedesaan Pagi Cerah'}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className={`p-2 rounded-xl border transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
                isNight
                  ? 'bg-[#111a14] hover:bg-[#1a2c20] text-emerald-300 border-emerald-500/20'
                  : 'bg-white hover:bg-[#ebf2ec] text-[#1b4332] border-[#e4ded5]'
              }`}
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};
