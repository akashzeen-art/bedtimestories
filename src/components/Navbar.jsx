import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Stories', to: '/books' },
];

const LOGO   = '/SlumberlyAI Dreamy Teddy Logo.png';
const BEER   = 'https://uk.bedtimestories.world/bedtime/images/beer.png';

export default function Navbar({ gradient = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top navbar */}
      <div className={`navbox${gradient ? ' gradient_bg' : ''}`}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px' }}>
          <div className="navbar-inner">
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
