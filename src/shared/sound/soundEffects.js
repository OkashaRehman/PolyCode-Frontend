let audioContext = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

function playTone({ frequency = 440, duration = 0.08, type = "sine", volume = 0.05, attack = 0.01, release = 0.06 }) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0001), now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + release);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + release + 0.02);
}

const SOUND_PRESETS = {
  click: () => playTone({ frequency: 620, duration: 0.04, volume: 0.035 }),
  success: () => {
    playTone({ frequency: 523, duration: 0.07, volume: 0.05 });
    window.setTimeout(() => playTone({ frequency: 784, duration: 0.09, volume: 0.05 }), 70);
  },
  error: () => {
    playTone({ frequency: 220, duration: 0.1, type: "triangle", volume: 0.055 });
    window.setTimeout(() => playTone({ frequency: 165, duration: 0.12, type: "triangle", volume: 0.05 }), 90);
  },
  run: () => playTone({ frequency: 392, duration: 0.05, volume: 0.04 }),
  tab: () => playTone({ frequency: 480, duration: 0.035, volume: 0.03 }),
  navigate: () => playTone({ frequency: 540, duration: 0.045, volume: 0.032 }),
  toggle: () => playTone({ frequency: 700, duration: 0.04, volume: 0.035 }),
};

export function playSound(name, enabled = true) {
  if (!enabled) return;
  const preset = SOUND_PRESETS[name];
  if (preset) preset();
}
