import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ProfilePhotoCard } from './ProfilePhotoCard';
import { ArchitectureStage } from './ArchitectureStage';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

export const EditorialProfile: React.FC = () => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const reduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="about"
      className={`relative pt-20 pb-24 sm:pt-28 sm:pb-32 transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.header
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Tentang &amp; Fokus Kerja
          </h2>
          <p className={`mt-3 text-base leading-relaxed ${isNight ? 'text-[#95a499]' : 'text-[#48564c]'}`}>
            Full Stack Developer dengan pengalaman membangun e-commerce, sistem gudang, dan CRM penjualan, plus aplikasi mobile Flutter.
          </p>
        </motion.header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5"
          >
            <ProfilePhotoCard />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7"
          >
            <ArchitectureStage />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
