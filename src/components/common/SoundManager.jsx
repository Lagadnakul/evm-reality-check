import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

// Sound URLs - we'll use web audio API for simple tones
const SoundManager = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);

  // Initialize AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Clean up oscillators
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        if (osc && osc.stop) {
          osc.stop();
        }
      });
      oscillatorsRef.current = [];
    };
  }, []);

  const playClick = () => {
    if (isMuted || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      gainNode.gain.setValueAtTime(volume * 0.5, audioContextRef.current.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.05);

      oscillatorsRef.current.push(oscillator);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const playHover = () => {
    if (isMuted || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime);
      gainNode.gain.setValueAtTime(volume * 0.3, audioContextRef.current.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.08);

      oscillatorsRef.current.push(oscillator);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const playSuccess = () => {
    if (isMuted || !audioContextRef.current) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContextRef.current.currentTime + i * 0.05);
        gainNode.gain.setValueAtTime(volume * 0.4, audioContextRef.current.currentTime + i * 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        oscillator.start(audioContextRef.current.currentTime + i * 0.05);
        oscillator.stop(audioContextRef.current.currentTime + i * 0.05 + 0.3);

        oscillatorsRef.current.push(oscillator);
      });
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const playError = () => {
    if (isMuted || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
      gainNode.gain.setValueAtTime(volume * 0.4, audioContextRef.current.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.2);

      oscillatorsRef.current.push(oscillator);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const playNotification = () => {
    if (isMuted || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
      gainNode.gain.setValueAtTime(volume * 0.3, audioContextRef.current.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.1);

      oscillatorsRef.current.push(oscillator);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolumeLevel = (newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        volume,
        toggleMute,
        setVolume: setVolumeLevel,
        playClick,
        playHover,
        playSuccess,
        playError,
        playNotification
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundManager');
  }
  return context;
};

export default SoundManager;
