import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
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
• Pengalaman: HolyCat Labs (3.000+ pengguna, 50+ REST APIs, Flutter Clean Arch, Midtrans ACID), Abby & Gail Mobile App, Dinas Cipta Bintar Kota Bandung
• Tech Stack: React, Next.js, Flutter, TypeScript, Node.js, Laravel, PostgreSQL, MySQL, Docker, Linux/NixOS
• Portofolio: https://rendisutendi.id
• Email: rendisutendi21@gmail.com | WA: +62 857-2145-1615 | GitHub: https://github.com/RendiS10`;

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
      className={`relative z-20 -mt-1 w-full select-none py-24 overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-[#060e08] text-[#f8fafc]' : 'bg-[#132a20] text-[#0f172a]'
      }`}
    >
      <ContactOceanCanvas isNight={isNight} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-12 space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.55,
            type: 'spring',
            stiffness: 220,
            damping: 24
          }}
          className={`p-5 sm:p-12 rounded-[24px] sm:rounded-[36px] transition-colors duration-300 space-y-5 sm:space-y-8 ${
            isNight
              ? 'bg-[#142118] border-2 sm:border-3 border-emerald-500/35 shadow-[6px_6px_0px_#040906] sm:shadow-[10px_10px_0px_#040906]'
              : 'bg-[#fffdf5] border-2 sm:border-3 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] sm:shadow-[10px_10px_0px_#0f172a]'
          }`}
        >
          {/* header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <div className={`flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-mono font-black border-2 ${
                isNight
                  ? 'bg-amber-400 text-stone-900 border-amber-300 shadow-[2px_2px_0px_#040906] sm:shadow-[3px_3px_0px_#040906]'
                  : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a]'
              } w-fit`}>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>KONTAK</span>
              </div>

              <div className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl border-2 text-[10px] sm:text-xs font-mono font-black ${
                isNight
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 shadow-[2px_2px_0px_#040906]'
                  : 'bg-[#dcfce7] border-[#0f172a] text-[#15803d] shadow-[2px_2px_0px_#0f172a]'
              }`}>
                STATUS: TERSEDIA
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] ${
                isNight ? 'text-amber-100' : 'text-[#0f172a]'
              }`}>
                Mari Berdiskusi &amp; Berkolaborasi
              </h2>
              <p className={`text-xs sm:text-base font-medium leading-relaxed max-w-2xl ${
                isNight ? 'text-emerald-200/80' : 'text-[#475569]'
              }`}>
                Punya ide proyek, kebutuhan rekayasa web/mobile, atau peluang karier? Hubungi saya langsung melalui WhatsApp, Email, atau topik di bawah.
              </p>
            </div>
          </div>

          {/* interactive inquiry matrix & tactile controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-stretch">
            {/* topic selector & actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="md:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5"
            >
              <div className="space-y-2.5">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                  isNight ? 'text-emerald-300' : 'text-[#64748b]'
                }`}>
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
                        className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer border-2 ${
                          isSelected
                            ? isNight
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-[2px_2px_0px_#040906]'
                              : 'bg-[#2d6a4f] text-white border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                            : isNight
                              ? 'bg-[#1a2c20] text-stone-200 border-emerald-500/30 shadow-[1.5px_1.5px_0px_#040906] hover:bg-emerald-800/40'
                              : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a] hover:bg-[#fde047]'
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* send email and whatsapp button group */}
              <div className={`space-y-3 pt-2 border-t-2 ${isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'}`}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full">
                  <a
                    href={profileData.contact.whatsapp || 'https://wa.me/6285721451615'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-mono font-black text-xs sm:text-sm transition-all cursor-pointer border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Chat WhatsApp</span>
                  </a>

                  <a
                    href={mailtoLink}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#fde047] hover:bg-[#facc15] text-[#0f172a] font-mono font-black text-xs sm:text-sm transition-all cursor-pointer border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 shrink-0"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>Kirim Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => copy(profileData.contact.email)}
                    className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl font-mono font-bold text-xs sm:text-sm transition-all cursor-pointer border-2 shrink-0 ${
                      isNight
                        ? 'bg-[#18281d] hover:bg-[#203627] text-emerald-100 border-emerald-500/40 shadow-[2px_2px_0px_#040906]'
                        : 'bg-[#fffdf5] hover:bg-[#edf2eb] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                    }`}
                    title="Salin alamat email"
                  >
                    <Mail className={`w-4 h-4 shrink-0 ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`} />
                    <span>{profileData.contact.email}</span>
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400 ml-1 shrink-0" />
                    ) : (
                      <Copy className={`w-4 h-4 ml-1 shrink-0 ${isNight ? 'text-emerald-300/60' : 'text-[#64748b]'}`} />
                    )}
                  </button>
                </div>

                {copied && (
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-3.5 h-3.5" />
                    <span>Email berhasil disalin ke clipboard!</span>
                  </div>
                )}

                {/* Recruiter Quick Snippet Button */}
                <div className={`pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t ${
                  isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'
                }`}>
                  <button
                    type="button"
                    onClick={handleCopySnippet}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono font-bold text-xs border shadow-xs cursor-pointer transition-all active:scale-95 ${
                      isNight
                        ? 'bg-[#18281d] hover:bg-[#203627] text-emerald-200 border-emerald-500/40'
                        : 'bg-[#edf2eb] hover:bg-[#d8dfd5] text-[#0f172a] border-[#0f172a]/30'
                    }`}
                    title="Salin ringkasan singkat profil untuk diteruskan ke tim rekrutmen/internal"
                  >
                    <FileText className={`w-3.5 h-3.5 ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`} />
                    <span>{snippetCopied ? 'Ringkasan Berhasil Disalin!' : 'Salin Ringkasan Kandidat (HR / Tech Lead)'}</span>
                    {snippetCopied && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  {snippetCopied && (
                    <span className="text-[11px] font-mono text-emerald-400 font-bold animate-fadeIn">
                      Format siap tempel di Slack/WA/Teams!
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* flip card tile for status and secret note */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.22 }}
              style={{ perspective: '800px' }}
              className="md:col-span-5 min-h-[220px]"
            >
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 20 }}
                className="relative w-full h-full"
              >
                {/* status, clock and socials */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className={`w-full h-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 flex flex-col justify-between space-y-3.5 sm:space-y-4 ${
                    isNight
                      ? 'bg-[#18281d] border-emerald-500/35 shadow-[3px_3px_0px_#040906] sm:shadow-[4px_4px_0px_#040906]'
                      : 'bg-[#edf2eb] border-[#0f172a] shadow-[3px_3px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a]'
                  }`}
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 ${
                      isNight ? 'bg-[#101b13] border-emerald-500/30' : 'bg-[#fffdf5] border-[#0f172a]'
                    }`}>
                      <div className={`flex items-center gap-2 text-xs font-mono font-bold ${
                        isNight ? 'text-emerald-300' : 'text-[#475569]'
                      }`}>
                        <Clock className={`w-4 h-4 ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`} />
                        <span>Waktu Lokal (WIB)</span>
                      </div>
                      <span className={`text-sm font-mono font-black tabular-nums ${
                        isNight ? 'text-amber-300' : 'text-[#0f172a]'
                      }`}>
                        {currentTime || '16:00:00'}
                      </span>
                    </div>

                    <div className={`flex items-center gap-2 text-xs font-mono px-1 ${
                      isNight ? 'text-emerald-200/80' : 'text-[#475569]'
                    }`}>
                      <MapPin className="w-4 h-4 text-[#ef4444] shrink-0" />
                      <span>Indonesia • Remote &amp; Hybrid Ready</span>
                    </div>
                  </div>

                  <div className={`space-y-2 pt-2 border-t-2 ${isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
                        isNight ? 'text-emerald-300' : 'text-[#64748b]'
                      }`}>
                        Socials &amp; Kontak Langsung
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsFlipped(true)}
                        className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-bold cursor-pointer ${
                          isNight ? 'text-amber-300 hover:text-amber-200' : 'text-[#2d6a4f] hover:text-[#0f172a]'
                        }`}
                      >
                        <span>Pesan Rahasia</span>
                        <RotateCw className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <a
                        href={profileData.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl font-mono font-bold text-[11px] sm:text-xs transition-all border-2 hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-between group ${
                          isNight
                            ? 'bg-[#101b13] hover:bg-[#1a2c20] text-emerald-100 border-emerald-500/35 shadow-[2px_2px_0px_#040906]'
                            : 'bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>GitHub</span>
                        </div>
                        <ExternalLink className={`w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
                          isNight ? 'text-emerald-400' : 'text-[#64748b]'
                        }`} />
                      </a>

                      <a
                        href={profileData.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl font-mono font-bold text-[11px] sm:text-xs transition-all border-2 hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-between group ${
                          isNight
                            ? 'bg-[#101b13] hover:bg-[#1a2c20] text-emerald-100 border-emerald-500/35 shadow-[2px_2px_0px_#040906]'
                            : 'bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <svg className={`w-3.5 h-3.5 fill-current ${isNight ? 'text-emerald-400' : 'text-[#2d6a4f]'}`} viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          <span>LinkedIn</span>
                        </div>
                        <ExternalLink className={`w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
                          isNight ? 'text-emerald-400' : 'text-[#64748b]'
                        }`} />
                      </a>

                      <a
                        href={profileData.contact.whatsapp || 'https://wa.me/6285721451615'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl font-mono font-bold text-[11px] sm:text-xs transition-all border-2 hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-between group ${
                          isNight
                            ? 'bg-[#101b13] hover:bg-[#1a2c20] text-emerald-100 border-emerald-500/35 shadow-[2px_2px_0px_#040906]'
                            : 'bg-[#fffdf5] hover:bg-[#dcfce7] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WA</span>
                        </div>
                        <ExternalLink className={`w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
                          isNight ? 'text-emerald-400' : 'text-[#64748b]'
                        }`} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* secret developer note */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                  className={`absolute inset-0 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 flex flex-col justify-between space-y-3 ${
                    isNight
                      ? 'bg-amber-950/80 border-amber-500/40 shadow-[3px_3px_0px_#040906] sm:shadow-[4px_4px_0px_#040906]'
                      : 'bg-[#fde047] border-[#0f172a] shadow-[3px_3px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-black uppercase flex items-center gap-1.5 ${
                        isNight ? 'text-amber-200' : 'text-[#0f172a]'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pesan Rahasia Pengembang</span>
                      </span>
                    </div>
                    <p className={`text-xs font-medium leading-relaxed ${
                      isNight ? 'text-amber-100' : 'text-[#1e293b]'
                    }`}>
                      Terima kasih sudah menjelajahi portofolio ini sampai tuntas! Selalu terbuka untuk ngobrol santai seputar web dev, mobile tech, atau peluang kolaborasi.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-black border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isNight
                        ? 'bg-[#18281d] hover:bg-[#203627] text-amber-200 border-amber-500/35 shadow-[2px_2px_0px_#040906]'
                        : 'bg-[#fffdf5] hover:bg-[#edf2eb] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                    }`}
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Kembali ke Profil</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* footer dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className={`p-4 sm:p-6 rounded-2xl sm:rounded-[28px] border-2 sm:border-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono font-bold ${
            isNight
              ? 'bg-[#142118] border-emerald-500/35 shadow-[4px_4px_0px_#040906] sm:shadow-[6px_6px_0px_#040906] text-stone-300'
              : 'bg-[#fffdf5] border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a] text-[#475569]'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
            <div className={`flex items-center justify-center gap-1.5 ${isNight ? 'text-stone-100' : 'text-[#0f172a]'}`}>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f59e0b] shrink-0" />
              <span>&copy; {new Date().getFullYear()} {profileData.name}</span>
              <span className="hidden sm:inline text-stone-500">•</span>
            </div>
            <span className={isNight ? 'text-emerald-400' : 'text-[#2d6a4f]'}>Full-Stack &amp; Mobile Software Engineer</span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-[10px] sm:text-[11px] ${isNight ? 'text-stone-400' : 'text-[#64748b]'}`}>
              {isNight ? 'Nuansa Malam Berkunang-kunang' : 'Nuansa Pedesaan Pagi Cerah'}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className={`p-2 sm:p-2.5 rounded-xl border-2 hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
                isNight
                  ? 'bg-[#18281d] hover:bg-emerald-900/50 text-amber-300 border-emerald-500/35 shadow-[2px_2px_0px_#040906]'
                  : 'bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
              }`}
              title="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
