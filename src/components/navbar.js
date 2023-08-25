import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'

function Navbar() {
    const [click, setClick] = useState(false);
    const handeClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo">
                Gas Graphs <i className="fa-solid fa-chart-line fa-lg"></i>
            </Link>
            <div className="menu-icon" onClick={handeClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                    <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                        About
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                        Contact
                    </Link>
                </li>
            </ul>

        </div>
        </nav>
        
    </>
  )
}

export default Navbar
