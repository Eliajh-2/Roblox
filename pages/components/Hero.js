// components/Hero.js
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero Section">
      <h1 className={styles.heroTitle}>Experience the Sound of ArtistName</h1>
      <p className={styles.heroSubtitle}>Explore captivating music and immerse yourself in the artistry of sound.</p>
      <a href="#music" className={styles.btnPrimary}>Listen Now</a>
    </section>
  )
}
