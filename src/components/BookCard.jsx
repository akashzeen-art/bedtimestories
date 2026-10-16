import { Link } from 'react-router-dom';

const PLAY_IMG = 'https://uk.bedtimestories.world/bedtime/images/play.png';

export default function BookCard({ id, title, category, time, image }) {
  return (
    <div className="p-3 content_box" style={{ height: '100%' }}>
      <Link to={`/story/${id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          {/* 3D Book */}
          <div style={{ width: '50%', paddingRight: 8, flexShrink: 0 }}>
            <div className="book">
              <div className="back" />
              <div className="page6" style={{ position: 'relative' }}>
                <img
                  src={PLAY_IMG}
                  alt="play"
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)', maxWidth: 100,
                  }}
                />
              </div>
              <div className="page5" />
              <div className="page4" />
              <div className="page3" />
              <div className="page2" />
              <div className="page1" />
              <div
                className="front"
                style={{ backgroundImage: `url('${image}')` }}
              />
            </div>
          </div>

          {/* Info */}
          <div style={{ width: '50%', paddingLeft: 8 }}>
            <div className="title_book">{title}</div>
            <div style={{ display: 'flex', gap: 6, paddingTop: 12, paddingBottom: 12 }}>
              <div style={{ flex: '0 0 58%' }}>
                <div className="category_book">{category}</div>
              </div>
              <div style={{ flex: '0 0 38%' }}>
                <div className="time_book">{time} Min</div>
              </div>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}
