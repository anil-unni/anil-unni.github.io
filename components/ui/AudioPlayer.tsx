"use client";

import { useRef, useState, useEffect } from "react";

export interface AudioTrack {
  title: string;
  src: string;
  duration: string;
}

interface AudioPlayerProps {
  tracks: AudioTrack[];
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const track = tracks[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
    setProgress(ratio * duration);
  }

  function formatTime(s: number) {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      className="rounded-xl border border-border bg-surface p-5 w-full max-w-sm"
      aria-label="Audio player"
    >
      <audio ref={audioRef} src={track?.src} preload="metadata" />

      {/* Track info */}
      <div className="mb-4">
        <p className="text-[10px] tracking-wider text-muted uppercase mb-1">
          Now playing
        </p>
        <p className="text-sm font-medium text-foreground truncate">
          {track?.title ?? "No track"}
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="relative h-1 rounded-full bg-surface-raised cursor-pointer mb-2"
        onClick={handleSeek}
        role="slider"
        aria-label="Playback progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
      >
        <div
          className="h-full rounded-full bg-accent transition-none"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Time */}
      <div className="flex justify-between text-[10px] text-muted mb-4">
        <span>{formatTime(progress)}</span>
        <span>{track?.duration ?? formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Track selector */}
        {tracks.length > 1 && (
          <div className="flex gap-1.5 flex-wrap">
            {tracks.map((t, i) => (
              <button
                key={t.src}
                onClick={() => {
                  setCurrentIndex(i);
                  setPlaying(false);
                  setProgress(0);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                  i === currentIndex
                    ? "border-accent text-accent bg-accent/10"
                    : "border-border text-muted hover:border-accent/40"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Volume */}
        <div className="ml-auto flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted shrink-0">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 010 7.07"/>
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 accent-accent cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
