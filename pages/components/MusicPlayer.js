// components/MusicPlayer.js
import { useState, useRef, useEffect } from 'react'
import styles from './MusicPlayer.module.css'

export default function MusicPlayer({ playlist }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime
    const duration = audioRef.current.duration
    setProgress(current / duration)
  }

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = clickX / rect.width
    audioRef.current.currentTime = newProgress * audioRef.current.duration
  }

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    audioRef.current.volume = vol
  }

  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length
    setCurrentTrackIndex(newIndex)
    setIsPlaying(false)
  }

  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % playlist.length
    setCurrentTrackIndex(newIndex)
    setIsPlaying(false)
  }

  useEffect(() => {
    // Auto play when track changes
    if (isPlaying && audioRef.current) {
      audioRef.current.play()
    }
  }, [currentTrackIndex])

  return (
    <section className={styles.musicPlayer} id="music" aria-label="Music Player">
      <h2>Music Player</h2>
      <div className={styles.trackInfo}>
        <img
          src={playlist[currentTrackIndex].cover}
          alt={`Album cover for ${playlist[currentTrackIndex].title}`}
          className={styles.trackCover}
        />
        <div className={styles.trackDetails}>
          <p className={styles.trackTitle} aria-live="polite">{playlist[currentTrackIndex].title}</p>
          <p className={styles.trackArtist}>{playlist[currentTrackIndex].artist}</p>
        </div>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={prevTrack}
          aria-label="Previous track"
        >
          &#9664;&#9664;
        </button>
        <button
          className={styles.controlButton}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '❚❚' : '▶' }
        </button>
        <button
          className={styles.controlButton}
          onClick={nextTrack}
          aria-label="Next track"
        >
          &#9654;&#9654;
        </button>
      </div>
      <div
        className={styles.progressBar}
        ref={progressRef}
        onClick={handleProgressClick}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onKeyDown={(e) => {
          // handle arrow keys for accessibility
          if (e.key === 'ArrowLeft' && audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5)
          } else if (e.key === 'ArrowRight' && audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5)
          }
        }}
      >
        <div
          className={styles.progressFilled}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className={styles.volumeControl}>
        <label htmlFor="volume" className="sr-only">Volume</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume control slider"
        />
      </div>
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
    </section>
  )
}
