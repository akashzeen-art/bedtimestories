import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { ALL_BOOKS } from '../data/books';

const PER_PAGE = 12;

// Deduplicate by id
const BOOKS = Array.from(new Map(ALL_BOOKS.map(b => [b.id, b])).values());

export default function Books() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(BOOKS.length / PER_PAGE);
  const visible = BOOKS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 80, minHeight: '100vh', paddingBottom: 100 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '1rem 15px' }}>

          {/* Books grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -8px' }}>
            {visible.map((book) => (
              <div
                key={`${book.id}-${book.title}`}
                style={{ width: '100%', padding: '8px' }}
                className="book-col"
              >
                <BookCard {...book} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="block-27">
              <ul className="pagination">
                <li>
                  <span
                    onClick={() => { if (page > 1) { setPage(p => p - 1); window.scrollTo(0,0); } }}
                    style={{ cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
                  >←</span>
                </li>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li key={i} className={page === i + 1 ? 'active' : ''}>
                    {page === i + 1
                      ? <span>{i + 1}</span>
                      : <a onClick={() => { setPage(i + 1); window.scrollTo(0,0); }}>{i + 1}</a>
                    }
                  </li>
                ))}
                <li>
                  <span
                    onClick={() => { if (page < totalPages) { setPage(p => p + 1); window.scrollTo(0,0); } }}
                    style={{ cursor: page === totalPages ? 'default' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}
                  >→</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <Footer />
      <style>{`
        @media(min-width:768px)  { .book-col { width: 50%   !important; } }
        @media(min-width:1200px) { .book-col { width: 33.333% !important; } }
      `}</style>
    </>
  );
}
