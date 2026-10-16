import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Books', to: '/books' },
  { label: 'Profile', to: '/dashboard' },
  { label: 'Ebooks', disabled: true },
  { label: 'Games', disabled: true },
  { label: 'Logout', to: '/login' },
];

const LOGO   = 'https://uk.bedtimestories.world/bedtime/images/logo.png';
const AVATAR = 'https://pubmedia812.s3.eu-central-1.amazonaws.com/bedtime/3/RackMultipart20250724-50580-zg7w4a.png';
const BEER   = 'https://uk.bedtimestories.world/bedtime/images/beer.png';

export default function Navbar({ gradient = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top navbar */}
      <div className={`navbox${gradient ? ' gradient_bg' : ''}`}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px' }}>
          <div className="navbar-inner">
            <Link to="/dashboard">
              <div className="avatar_icon">
                <img src={AVATAR} alt="Avatar" />
              </div>
            </Link>
            <Link to="/" style={{ margin: '0 auto' }}>
              <img className="logo" src={LOGO} alt="logo" />
            </Link>
            <button className="hamburger-btn" onClick={() => setOpen(true)} aria-label="Open menu">
              <span className="hamburger-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="mobile-menu-overlay">
          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px', position: 'relative', zIndex: 6 }}>
            <div className="navbar-inner">
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <div className="avatar_icon">
                  <img src={AVATAR} alt="Avatar" />
                </div>
              </Link>
              <Link to="/" style={{ margin: '0 auto' }} onClick={() => setOpen(false)}>
                <img className="logo" src={LOGO} alt="logo" />
              </Link>
              <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                <span className="close-icon" />
              </button>
            </div>

            {NAV_LINKS.map((l) =>
              l.disabled ? (
                <span key={l.label} className="menu_button disabled">{l.label}</span>
              ) : (
                <Link key={l.to} to={l.to} className="menu_button" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              )
            )}
          </div>
          <div className="skewedBG" />
          <img src={BEER} className="beer-img" alt="" />
        </div>
      )}
    </>
  );
}
