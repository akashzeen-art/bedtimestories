import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Fireflies from '../components/Fireflies';
import BookCard from '../components/BookCard';
import { FEATURED_BOOKS } from '../data/books';

export default function Home() {
  return (
    <>
      <Navbar gradient />

      {/* Hero */}
      <div className="hero-section">
        <div className="background_0" />
        <div className="background_1" />
        <Fireflies />
        <div className="shootingstar_box">
          <div className="shooting_star" />
        </div>
        <div className="welcomes">
          <div className="welcome_big">GOOD EVENING</div>
          <div className="welcome_small">Which story do you want me to tell you this evening?</div>
        </div>
      </div>

      <div className="arrow">
        <span /><span /><span />
      </div>

      {/* Featured books */}
      <div style={{ position: 'relative', zIndex: 5, paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -8px', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
            {FEATURED_BOOKS.map((book) => (
              <div key={book.id} style={{ width: '100%', padding: '0 8px', marginBottom: 16 }} className="book-col">
                <BookCard {...book} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <Link to="/books" className="moreButton">More books</Link>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media(min-width:768px){ .book-col{ width:50% !important; } }
        @media(min-width:1200px){ .book-col{ width:33.333% !important; } }
      `}</style>
    </>
  );
}
