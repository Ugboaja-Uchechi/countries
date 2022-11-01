import styles from '../styles/Navbar.module.css';
import { useState, useEffect } from 'react';
import { HiOutlineMoon } from "react-icons/hi"
import { BsFillSunFill } from "react-icons/bs"

const Navbar = () => {
  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <h2>Where in the world?</h2>
        </div>
        <div onClick={() => setActiveTheme(inactiveTheme)}>
        {activeTheme === "light" ? (
            <p className={styles.paragraph}><HiOutlineMoon /> Dark Mode</p>
          ) : (
            <p className={styles.paragraph}><BsFillSunFill /> Light Mode</p>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar;