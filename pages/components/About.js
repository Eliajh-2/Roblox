// components/About.js
import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.about} id="about" aria-label="About Section">
      <h2>About ArtistName</h2>
      <p>
        ArtistName is an innovative music artist blending soulful melodies with modern beats.
        With a passion for creating immersive sound experiences, ArtistName's music captivates audiences worldwide.
      </p>
    </section>
  )
}
