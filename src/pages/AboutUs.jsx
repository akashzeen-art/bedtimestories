import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LIBRARY_IMG = 'https://uk.bedtimestories.world/bedtime/images/library.png';
const STORYTELLER_IMG = 'https://uk.bedtimestories.world/bedtime/images/story_teller.jpg';
const STATISTICS_IMG = 'https://uk.bedtimestories.world/bedtime/images/statistics.jpg';
const PLAY_IMG = 'https://uk.bedtimestories.world/bedtime/images/play.png';

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px' }}>

          <div className="text-center regular_title">Explore. Imagine. Have Fun.</div>

          {/* Section 1 */}
          <div className="regular_info_part" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0 }}>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px' }}>
              <p className="main_ebook_basic_text">
                <b>Bedtime Stories</b><br /><br />
                Bedtime Stories is a comprehensive reading platform for children that features a wide range of popular stories from various cultures worldwide. It embraces the time-honored tradition of bedtime storytelling, which nurtures a love for literature and storytelling in young minds.
                <br /><br />
                Our extensive collection includes fairy tales and short stories that can aid in building your child's vocabulary, enhancing their skills, stimulating their imagination, and fostering their creativity. With Bedtime Stories, we offer the best of all worlds - reading, listening, and interactive experiences - for an engaging and enriching literary adventure for your child.
              </p>
            </div>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px' }}>
              <div className="hero-placeholder">
                <img src={PLAY_IMG} className="play-button-vid" alt="play" />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="regular_info_part" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0 }}>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px', order: 2 }} className="order-md-1">
              <div className="image_box_ebooks">
                <img src={LIBRARY_IMG} width="100%" alt="library" />
              </div>
            </div>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px', order: 1 }} className="order-md-2">
              <p className="main_ebook_basic_text">
                <b>Book Library</b><br /><br />
                Discover a vast collection of fairy tales and short stories in our comprehensive library and indulge in classic tales like The Jungle Book, Aladdin and the Magic Lamp, Peter Pan, and a multitude of other timeless stories!
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="regular_info_part" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0 }}>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px' }}>
              <p className="main_ebook_basic_text">
                <b>Choose your Story Teller</b><br /><br />
                Embark on a thrilling adventure with our skilled storytellers as they guide you through an immersive tale. You have the freedom to choose your adventure companion and set off on a journey filled with wonder, danger, and excitement!
              </p>
            </div>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px' }}>
              <div className="image_box_ebooks">
                <img src={STORYTELLER_IMG} width="100%" alt="storyteller" />
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="regular_info_part" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0 }}>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px', order: 2 }}>
              <div className="image_box_ebooks">
                <img src={STATISTICS_IMG} width="100%" alt="statistics" />
              </div>
            </div>
            <div style={{ width: '100%', flex: '1 1 300px', padding: '0 15px', order: 1 }}>
              <p className="main_ebook_basic_text">
                <b>Track Your Progress &amp; Unlock Achievements</b><br /><br />
                With our Statistics Center, you can monitor your child's reading progress and track the time they spend on books. Additionally, our exclusive Achievements feature can help ignite your child's passion for reading.
              </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
