import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Copy, Check, Mail, MapPin, Send, ArrowUp, MessageCircle, FileText } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { profileData } from '../../data/portfolioData';
import { ContactPaddyCanvas } from './ContactPaddyCanvas';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const WHATSAPP_FALLBACK = 'https://wa.me/6285721451615';
const EMAIL_SUBJECT = 'Inquiry: Full-Stack / Mobile';

export const ContactSection: React.FC = () => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const reduceMotion = useReducedMotion();
  const emailClipboard = useClipboard();
  const snippetClipboard = useClipboard(3000);

  const whatsappUrl = profileData.contact.whatsapp || WHATSAPP_FALLBACK;

  const recruiterSnippet = `Rendi Sutendi — Full Stack Developer
• Pendidikan: S1 Teknik Informatika (IPK 3.70 / 4.00), STMIK Mardira Indonesia
• Pengalaman: Holycatlabs (e-commerce, sistem gudang, CRM penjualan, Flutter), Abby & Gail, Dinas Cipta Bintar Kota Bandung
• Tech Stack: React, Next.js, Flutter, TypeScript, Node.js, Laravel, PostgreSQL, MySQL, Docker, Linux
• Portofolio: https://rendisutendi.id
• Email: ${profileData.contact.email} | WA: ${whatsappUrl.replace('https://wa.me/', '+')} | GitHub: ${profileData.contact.github}`;

  const mailtoLink = `mailto:${profileData.contact.email}?subject=${encodeURIComponent(
    EMAIL_SUBJECT
  )}&body=${encodeURIComponent(
    `Halo ${profileData.name.split(' ')[0]},\n\n[Tulis pesan Anda di sini]\n\nSalam,\n`
  )}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const muted = isNight ? 'text-[#95a499]' : 'text-[#48564c]';
  const accent = isNight ? 'text-[#80ed99]' : 'text-[#1b4332]';
  const divider = isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]';
  const quietButton = isNight
    ? 'border-[#1f2d24] text-[#95a499] hover:text-[#f5f7f4] hover:border-[#80ed99]/50'
    : 'border-[#e4ded5] text-[#48564c] hover:text-[#151e17] hover:border-[#1b4332]/50';
  const focusRing = isNight ? 'focus-visible:ring-[#80ed99]' : 'focus-visible:ring-[#1b4332]';

  const copyLabel = (state: { copied: boolean; failed: boolean }, idle: string, done: string) =>
    state.failed ? 'Gagal menyalin' : state.copied ? done : idle;

  return (
    <section
      id="contact"
      className={`relative z-20 w-full select-none pt-20 pb-0 overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      <ContactPaddyCanvas isNight={isNight} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 mb-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`p-6 sm:p-10 rounded-2xl border ${
            isNight ? 'bg-[#111a14] border-[#1f2d24]' : 'bg-white border-[#e4ded5]'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Hubungi Saya</h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-2xl ${muted}`}>
            Terbuka untuk peluang Full-Stack / Mobile, Bandung &amp; Remote. Hubungi saya lewat WhatsApp atau email.
          </p>

          <div className={`mt-8 pt-8 border-t ${divider} grid grid-cols-1 md:grid-cols-12 gap-8`}>
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 ${focusRing} ${
                    isNight
                      ? 'bg-[#80ed99] hover:bg-[#9af2ae] text-[#090f0c]'
                      : 'bg-[#1b4332] hover:bg-[#153427] text-[#fbfaf6]'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Chat WhatsApp</span>
                </a>

                <a
                  href={mailtoLink}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border transition-colors focus:outline-none focus-visible:ring-2 ${focusRing} ${
                    isNight
                      ? 'border-[#1f2d24] text-[#f5f7f4] hover:border-[#80ed99]/50'
                      : 'border-[#e4ded5] text-[#151e17] hover:border-[#1b4332]/50'
                  }`}
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Kirim Email</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => emailClipboard.copy(profileData.contact.email)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 ${focusRing} ${quietButton}`}
                  title="Klik untuk menyalin email"
                >
                  <Mail className={`w-3.5 h-3.5 ${accent}`} />
                  <span>{profileData.contact.email}</span>
                  {emailClipboard.copied ? (
                    <span className={`flex items-center gap-1 text-xs font-semibold ${accent}`}>
                      <Check className="w-3 h-3" /> Tersalin
                    </span>
                  ) : emailClipboard.failed ? (
                    <span className="text-xs font-semibold text-red-500">Gagal menyalin</span>
                  ) : (
                    <Copy className="w-3 h-3 opacity-60" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => snippetClipboard.copy(recruiterSnippet)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 ${focusRing} ${quietButton}`}
                  title="Salin ringkasan singkat profil untuk diteruskan ke tim rekrutmen"
                >
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                  <span>{copyLabel(snippetClipboard, 'Salin ringkasan profil', 'Ringkasan tersalin')}</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-5 space-y-4">
              <p className={`flex items-center gap-2 text-sm ${muted}`}>
                <MapPin className={`w-4 h-4 shrink-0 ${accent}`} />
                <span>Bandung, Jawa Barat · Remote</span>
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'GitHub', href: profileData.contact.github },
                  { label: 'LinkedIn', href: profileData.contact.linkedin }
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-colors focus:outline-none focus-visible:ring-2 ${focusRing} ${quietButton}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <footer
        className={`w-full border-t py-6 px-4 sm:px-8 lg:px-12 transition-colors duration-500 ${
          isNight ? 'bg-[#060c08] border-[#1f2d24] text-[#95a499]' : 'bg-[#f5f3ec] border-[#e4ded5] text-[#48564c]'
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span className={isNight ? 'text-[#f5f7f4] font-semibold' : 'text-[#151e17] font-semibold'}>
              &copy; {new Date().getFullYear()} {profileData.name}
            </span>
            <span className="opacity-40">•</span>
            <span>Bandung, Indonesia</span>
            <span className="opacity-40 hidden sm:inline">•</span>
            <span className={accent}>Full Stack Developer</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={`p-2 rounded-lg border cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 ${focusRing} ${quietButton}`}
            title="Kembali ke atas"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </section>
  );
};
