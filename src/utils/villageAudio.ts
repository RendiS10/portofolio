// Pure Web Audio API Synthesizer for Authentic Village Ambience & Bamboo Notes (Zero MP3 dependencies)

class VillageAudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientRunning = false;
  private cricketTimer: ReturnType<typeof setInterval> | null = null;
  private isMuted = true;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMutedState(): boolean {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rs-village-sound');
      if (saved !== null) {
        this.isMuted = saved !== 'true';
      }
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('rs-village-sound', (!muted).toString());
    }

    if (muted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playBambooNote(520);
    }
  }

  // Pentatonic Indonesian Bamboo / Angklung Resonance (Da-Mi-Na-Ti-La tones)
  public playBambooNote(frequency = 520): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, now);

      // Warm acoustic wood filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(4, now);

      // Acoustic chime envelope
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // AudioContext safe fallback
    }
  }

  // Synthesized Friendly Village Rooster Crow
  public playRoosterCrow(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Multi-pitch crowing curve: ku-ku-ru-yuuuk!
      const pitches = [330, 440, 550, 720];
      const durations = [0.14, 0.16, 0.18, 0.65];
      let offset = 0;

      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + offset);
        if (idx === pitches.length - 1) {
          osc.frequency.exponentialRampToValueAtTime(580, now + offset + durations[idx]);
        }

        const dur = durations[idx];
        gain.gain.setValueAtTime(0.08, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + dur);
        offset += dur * 0.85;
      });
    } catch {
      // safe fallback
    }
  }

  // Gentle nocturnal crickets (Jangkrik Senja)
  private playCricketChirp(): void {
    if (this.isMuted || !this.isAmbientRunning) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(4500 + Math.random() * 400, now);

      // Fast oscillatory flutter
      const pulseRate = 18;
      const pulses = 3;
      const pulseDur = 1 / pulseRate;

      for (let i = 0; i < pulses; i++) {
        const t = now + i * pulseDur;
        gain.gain.setValueAtTime(0.012, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + pulseDur * 0.8);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + pulses * pulseDur);
    } catch {
      // safe fallback
    }
  }

  public startAmbient(): void {
    if (this.isMuted || this.isAmbientRunning) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      this.isAmbientRunning = true;
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);
      this.ambientGain.connect(ctx.destination);

      // Subtle evening breeze noise generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);
      whiteNoise.start();

      // Intermittent gentle crickets every 2 - 5 seconds
      this.cricketTimer = setInterval(() => {
        if (Math.random() > 0.35) {
          this.playCricketChirp();
        }
      }, 2600);
    } catch {
      this.isAmbientRunning = false;
    }
  }

  public stopAmbient(): void {
    if (!this.isAmbientRunning) return;
    const ctx = this.ctx;
    if (ctx && this.ambientGain) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      } catch {
        // safe rampdown
      }
    }
    if (this.cricketTimer) {
      clearInterval(this.cricketTimer);
      this.cricketTimer = null;
    }
    this.isAmbientRunning = false;
  }
}

export const villageAudio = new VillageAudioEngine();
