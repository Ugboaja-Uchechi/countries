import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <h2>Where in the world?</h2>
        </div>
        <div>
          <p className={styles.paragraph}>Dark Mode</p>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;