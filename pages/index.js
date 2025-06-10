import { useState, useRef, useEffect } from 'react'

export default function Home() {
  // Playlist data with sample songs (can be replaced with real URLs)
  const playlist = [
    {
      title: 'Song One',
      artist: 'Artist Name',
      src: 'https://cdn.pixabay.com/audio/2022/03/16/audio_94cc464549.mp3',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Song Two',
      artist: 'Artist Name',
      src: 'https://cdn.pixabay.com/audio/2021/10/22/audio_490118d993.mp3',
      cover: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Song Three',
      artist: 'Artist Name',
      src: 'https://cdn.pixabay.com/audio/2021/10/17/audio_3cd7de0712.mp3',
      cover: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=400&q=80',
    },
  ]

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');

        :root {
          --color-primary: #111827;
          --color-neutral: #6b7280;
          --color-bg: #ffffff;
          --color-muted: #f9fafb;
          --color-shadow: rgba(0,0,0,0.05);
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin:0;
          font-family: 'Poppins', sans-serif;
          background-color: var(--color-bg);
          color: var(--color-primary);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          color: var(--color-primary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        a:hover, a:focus {
          color: #2563eb;
          outline: none;
        }

        header {
          position: sticky;
          top: 0;
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-muted);
          z-index: 10;
          box-shadow: 0 2px 4px var(--color-shadow);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4.5rem;
        }

        nav ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        nav li a {
          font-weight: 600;
          font-size: 1rem;
          padding: 0.25rem 0;
          position: relative;
        }

        nav li a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background-color: #2563eb;
          transition: width 0.3s ease;
          border-radius: 1px;
        }

        nav li a:hover::after,
        nav li a:focus::after {
          width: 100%;
        }

        main {
          padding: 4rem 1.5rem 6rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero {
          text-align: center;
          padding: 6rem 1rem 4rem;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
          color: var(--color-primary);
        }

        .hero p {
          font-size: 1.25rem;
          color: var(--color-neutral);
          max-width: 540px;
          margin: 0 auto 2.5rem;
        }

        .btn-primary {
          background-color: #2563eb;
          color: white;
          font-weight: 700;
          padding: 1rem 2.5rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          font-size: 1.125rem;
          box-shadow: 0 8px 15px rgba(37, 99, 235, 0.25);
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .btn-primary:hover,
        .btn-primary:focus {
          background-color: #1e40af;
          outline: none;
          transform: scale(1.05);
        }

        section {
          margin-bottom: 5rem;
        }

        h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          color: var(--color-primary);
        }

        .music-player {
          max-width: 600px;
          margin: 0 auto;
          background-color: var(--color-muted);
          border-radius: 0.75rem;
          padding: 1.5rem 1.5rem 2rem;
          box-shadow: 0 4px 10px var(--color-shadow);
        }

        .track-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .track-cover {
          width: 64px;
          height: 64px;
          border-radius: 0.5rem;
          object-fit: cover;
          flex-shrink: 0;
        }

        .track-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .track-title {
          font-weight: 700;
          font-size: 1.25rem;
          margin: 0;
          color: var(--color-primary);
        }

        .track-artist {
          font-size: 0.9rem;
          color: var(--color-neutral);
          margin-top: 0.25rem;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 1.25rem;
        }

        .control-button {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-primary);
          font-size: 1.75rem;
          transition: color 0.3s ease;
          padding: 0.25rem;
          border-radius: 0.5rem;
        }

        .control-button:hover,
        .control-button:focus {
          color: #2563eb;
          outline: none;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #e5e7eb;
          border-radius: 4px;
          cursor: pointer;
          overflow: hidden;
        }

        .progress-filled {
          height: 100%;
          background-color: #2563eb;
          width: 0%;
          transition: width 0.1s linear;
          border-radius: 4px 0 0 4px;
        }

        .volume-control {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 150px;
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        input[type="range"]:focus {
          outline: none;
          background: #dbeafe;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border: none;
          margin-top: -5px;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border: none;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
        }

        .about, .gallery, .contact {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          color: var(--color-neutral);
          font-size: 1.125rem;
        }

        .gallery-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .gallery-item {
          flex: 1 1 150px;
          max-width: 200px;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 10px var(--color-shadow);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .gallery-item img {
          width: 100%;
          display: block;
          border-radius: 0.75rem;
          object-fit: cover;
        }

        .gallery-item:hover,
        .gallery-item:focus {
          transform: scale(1.05);
          outline: none;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
          text-align: left;
        }

        label {
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--color-primary);
        }

        input[type="text"], input[type="email"], textarea {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          resize: vertical;
          font-family: inherit;
        }

        input[type="text"]:focus, input[type="email"]:focus, textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
        }

        button[type="submit"] {
          background-color: #2563eb;
          color: white;
          font-weight: 700;
          padding: 0.75rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        button[type="submit"]:hover,
        button[type="submit"]:focus {
          background-color: #1e40af;
          outline: none;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }

          nav ul {
            gap: 1.25rem;
          }

          .controls {
            gap: 1.5rem;
          }
        }
      `}</style>

      <header role="banner">
        <div className="container">
          <a href="#" aria-label="Home" className="logo" style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
            ArtistName
          </a>
          <nav role="navigation" aria-label="Primary Navigation">
            <ul>
              <li>
                <a href="#music" tabIndex={0}>Music</a>
              </li>
              <li>
                <a href="#about" tabIndex={0}>About</a>
              </li>
              <li>
                <a href="#gallery" tabIndex={0}>Gallery</a>
              </li>
              <li>
                <a href="#contact" tabIndex={0}>Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main role="main">
        <section className="hero" aria-label="Hero Section">
          <h1>Experience the Sound of ArtistName</h1>
          <p>Explore captivating music and immerse yourself in the artistry of sound.</p>
          <a href="#music" className="btn-primary">Listen Now</a>
        </section>

        <section className="music-player" id="music" aria-label="Music Player">
          <h2>Music Player</h2>
          <div className="track-info">
            <img
              src={playlist[currentTrackIndex].cover}
              alt={`Album cover for ${playlist[currentTrackIndex].title}`}
              className="track-cover"
            />
            <div className="track-details">
              <p className="track-title" aria-live="polite">{playlist[currentTrackIndex].title}</p>
              <p className="track-artist">{playlist[currentTrackIndex].artist}</p>
            </div>
          </div>
          <div className="controls">
            <button
              className="control-button"
              onClick={prevTrack}
              aria-label="Previous track"
            >
              &#9664;&#9664;
            </button>
            <button
              className="control-button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button
              className="control-button"
              onClick={nextTrack}
              aria-label="Next track"
            >
              &#9654;&#9654;
            </button>
          </div>
          <div
            className="progress-bar"
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
              className="progress-filled"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="volume-control">
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

        <section className="about" id="about" aria-label="About Section">
          <h2>About ArtistName</h2>
          <p>
            ArtistName is an innovative music artist blending soulful melodies with modern beats.
            With a passion for creating immersive sound experiences, ArtistName's music captivates audiences worldwide.
          </p>
        </section>

        <section className="gallery" id="gallery" aria-label="Gallery Section">
          <h2>Gallery</h2>
          <div className="gallery-grid" role="list">
            <div className="gallery-item" role="listitem" tabIndex={0}>
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" alt="Artist performing on stage" />
            </div>
            <div className="gallery-item" role="listitem" tabIndex={0}>
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Closeup of artist with microphone" />
            </div>
            <div className="gallery-item" role="listitem" tabIndex={0}>
              <img src="https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=400&q=80" alt="Audience enjoying concert" />
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-label="Contact Section">
          <h2>Contact</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you for contacting ArtistName! We will get back to you soon.')
              e.target.reset()
            }}
          >
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Write your message..." required />

            <button type="submit">Send</button>
          </form>
        </section>
      </main>
    </>
  )
}

