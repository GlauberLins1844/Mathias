
import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Updated to use a local file. 
  // IMPORTANT: Ensure the uploaded MP3 is named 'audio.mp3' in the project root.
  const AUDIO_URL = "./audio.mp3"; 

  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    // Optional: Attempt auto-play with mute, then unmute on interaction if needed
    // For now, we rely on user interaction to start.

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
            console.error("Playback failed:", e);
            alert("Não foi possível tocar o áudio. Verifique se o arquivo 'audio.mp3' está carregado.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={togglePlay}
        className={`
            flex items-center justify-center w-14 h-14 rounded-full shadow-2xl border-4 border-white
            transition-all duration-300 transform hover:scale-110 active:scale-95
            ${isPlaying ? 'bg-amber-400 text-white animate-pulse-slow' : 'bg-white/90 text-blue-400'}
        `}
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
      >
        {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
      </button>
      {!isPlaying && (
        <div className="absolute top-16 right-0 w-max bg-white text-blue-600 text-sm font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none animate-bounce">
          Solta o som! 🎵
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
