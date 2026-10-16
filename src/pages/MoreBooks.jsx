import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';

const ALL_BOOKS = [
  { id: 44,  title: 'A Merchant and His Donkey',          category: 'Short Story', time: 3,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/44/a_merchant_and_his_donkey__1_.jpg' },
  { id: 19,  title: 'Aladdin and the Magic Lamp',         category: 'Fairy Tales', time: 12, image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/19/aladdin_and_the_magic_lamp.jpg' },
  { id: 538, title: 'Aldar and the Horse Cure',           category: 'Folktale',    time: 4,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/538/aldar_and_the_horse_cure.jpg' },
  { id: 537, title: "Aldar and the Khan's Fur Coat",      category: 'Folktale',    time: 6,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/537/aldar_and_the_khans_fur_coat.jpg' },
  { id: 27,  title: 'Ali Baba and the Forty Thieves',     category: 'Fairy Tales', time: 5,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/27/ali_baba_and_the_forty_thieves__1_.jpg' },
  { id: 534, title: 'Alice in Wonderland',                category: 'Fairy Tales', time: 8,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/534/alice_in_wonderland.jpg' },
  { id: 20,  title: 'Beauty and the Beast',               category: 'Fairy Tales', time: 12, image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/20/beauty_and_the_beast.jpg' },
  { id: 16,  title: 'Cinderella',                         category: 'Fairy Tales', time: 25, image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/16/cinderella.jpg' },
  { id: 543, title: 'Er Tostik and his Clever Companions',category: 'Folktale',    time: 11, image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/543/er_tostik_and_his_clever_companions.jpg' },
  { id: 6,   title: 'Goldilocks and the Three Bears',     category: 'Fairy Tales', time: 8,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/6/goldilocks_and_the_three_bears.jpg' },
  { id: 11,  title: 'Hansel and Gretel',                  category: 'Fairy Tales', time: 8,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/11/hansel_and_gretel.jpg' },
  { id: 4,   title: 'Jack and the Beanstalk',             category: 'Fairy Tales', time: 8,  image: 'https://pubmedia812.s3.eu-central-1.amazonaws.com/talking_story/4/jack_and_the_beanstalk.jpg' },
];

const PER_PAGE = 12;

export default function MoreBooks() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ALL_BOOKS.length / PER_PAGE);
  const visible = ALL_BOOKS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Navbar />
      <div
        className="container-fluid"
        id="dashboard"
        style={{ position: 'absolute', marginTop: '5rem', top: 0, zIndex: 5, paddingTop: '2rem', paddingBottom: '5rem', minHeight: '100vh' }}
      >
        <div className="container">
          <div className="row gy-2 g-md-2 mx-auto">
            {visible.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>

          {/* Pagination */}
          <div className="row py-4">
            <div className="col-12 text-center pb-5">
              <div className="block-27">
                <ul className="pagination">
                  <li>
                    <span
                      style={{ cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
                      onClick={() => page > 1 && setPage(page - 1)}
                    >←</span>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i} className={page === i + 1 ? 'active' : ''}>
                      {page === i + 1
                        ? <span>{i + 1}</span>
                        : <a href="#" onClick={(e) => { e.preventDefault(); setPage(i + 1); }}>{i + 1}</a>
                      }
                    </li>
                  ))}
                  <li>
                    <span
                      style={{ cursor: page === totalPages ? 'default' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}
                      onClick={() => page < totalPages && setPage(page + 1)}
                    >→</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
