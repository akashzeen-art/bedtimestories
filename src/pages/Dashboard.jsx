import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AVATAR_URL = 'https://pubmedia812.s3.eu-central-1.amazonaws.com/bedtime/3/RackMultipart20250724-50580-zg7w4a.png';
const LOGO = 'https://uk.bedtimestories.world/bedtime/images/logo.png';

const FAVORITES = [
  { id: 44, title: 'A Merchant and His Donkey' },
  { id: 8,  title: 'Three Little Pigs' },
  { id: 7,  title: 'Pinocchio' },
  { id: 4,  title: 'Jack and the Beanstalk' },
  { id: 1,  title: 'Little Red Riding Hood' },
];

const ACHIEVEMENTS_PAGES = [
  [
    { title: 'Profile Expert',   desc: 'Complete your profile',       done: true },
    { title: 'Avatar Creator',   desc: 'Change your avatar',          done: true },
    { title: 'Story Starter',    desc: 'Listen to your first story',  done: true },
    { title: 'Story Champion',   desc: 'Listen to 5 stories',         done: true },
    { title: 'Highbrow',         desc: 'Listen to 25 stories',        done: true },
    { title: 'Story Lover',      desc: 'Listen to 100 stories',       done: true },
  ],
  [
    { title: 'Story Hero',          desc: 'Listen to 250 stories',    done: true },
    { title: 'Friendship Starter',  desc: 'Invite a friend',          done: false },
    { title: 'Super Friendly',      desc: 'Invite 5 friends',         done: false },
    { title: 'Friendship Superstar',desc: 'Invite 15 friends',        done: false },
    { title: 'Active',              desc: 'Listen 3 days in a row',   done: false },
    { title: 'Dedicated',           desc: 'Listen 7 days in a row',   done: false },
  ],
  [
    { title: 'Addicted',     desc: 'Listen 14 days in a row', done: true },
    { title: "Can't stop",   desc: 'Listen 30 days in a row', done: true },
    { title: 'Curious',      desc: 'Listen for 1 hour',       done: true },
    { title: 'On the way',   desc: 'Listen for 10 hours',     done: false },
    { title: 'Interested',   desc: 'Listen for 100 hours',    done: false },
    { title: 'Ringing ears', desc: 'Listen for 1000 hours',   done: false },
  ],
];

const CHART_DATA = [44, 173, 134, 109, 222, 338, 573, 435, 356, 319, 112, 142];
const CHART_CATS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const TrophySVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 39.158 39.158">
    <rect width="39.158" height="39.158" fill="none"/>
    <path d="M29.105,6.263H25.842V3H9.526V6.263H6.263A3.273,3.273,0,0,0,3,9.526v1.632a8.144,8.144,0,0,0,7.163,8.06,8.173,8.173,0,0,0,5.89,4.829v5.058H9.526v3.263H25.842V29.105H19.316V24.047a8.173,8.173,0,0,0,5.89-4.829,8.144,8.144,0,0,0,7.163-8.06V9.526A3.273,3.273,0,0,0,29.105,6.263ZM6.263,11.158V9.526H9.526v6.233A4.912,4.912,0,0,1,6.263,11.158Zm11.421,9.789a4.909,4.909,0,0,1-4.895-4.895V6.263h9.789v9.789A4.909,4.909,0,0,1,17.684,20.947Zm11.421-9.789a4.912,4.912,0,0,1-3.263,4.6V9.526h3.263Z" transform="translate(1.895 1.895)" fill="#471fab"/>
  </svg>
);

export default function Dashboard() {
  const [voice, setVoice] = useState('female');
  const [achPage, setAchPage] = useState(0);

  const chartOptions = {
    chart: {
      type: 'bar', foreColor: '#fff',
      fontFamily: 'Montserrat, sans-serif',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    series: [{ name: 'Hours', data: CHART_DATA }],
    fill: { colors: ['#cca1cb'] },
    dataLabels: { style: { colors: ['#fff'] } },
    xaxis: {
      categories: CHART_CATS,
      labels: { show: true, rotate: -45, style: { colors: Array(12).fill('#fff') } },
    },
    yaxis: { labels: { style: { colors: ['#fff'] } } },
    grid: { borderColor: '#e0e0e0' },
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 15px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>

            {/* ── Left sidebar ── */}
            <div style={{ width: '100%', flex: '0 0 100%', padding: '1rem' }} className="account p-3 pt-4 sidebar-col">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <img className="logo" src={LOGO} alt="logo" style={{ display: 'none' }} />
                <div style={{ marginLeft: 'auto' }}>
                  <Link to="/settings" className="settings_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                      <path d="M0,0H24V24H0Z" fill="none"/>
                      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="#471fab"/>
                    </svg>
                  </Link>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: '1rem', paddingBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="avatar-wrap" style={{ flexShrink: 0 }}>
                  <div className="inside_avatar" style={{ backgroundImage: `url(${AVATAR_URL})` }} />
                  <button className="edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.664 15.664">
                      <path d="M0,0H15.664V15.664H0Z" fill="none"/>
                      <path d="M10.218,6.929l.6.6L4.906,13.442h-.6v-.6l5.913-5.913M12.568,3a.653.653,0,0,0-.457.189L10.917,4.384l2.447,2.447,1.194-1.194a.65.65,0,0,0,0-.92L13.031,3.189A.641.641,0,0,0,12.568,3Zm-2.35,2.082L3,12.3v2.447H5.447l7.218-7.218L10.218,5.082Z" transform="translate(-1.042 -1.042)" fill="#fff"/>
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="name_and_surname">Jane Williams</div>
                  <div className="email">jane@mail.com</div>
                  <div className="join_date">Joined <span>24-05-2022</span></div>
                </div>
              </div>

              <hr />

              <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                <div className="subtitle">Storyteller</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '8px 0' }}>
                <div className="gender" style={{ padding: '10px 0' }}>male</div>
                <label className="switch">
                  <input type="checkbox" checked={voice === 'female'} onChange={() => setVoice(v => v === 'female' ? 'male' : 'female')} />
                  <span className="slider" />
                </label>
                <div className="gender" style={{ padding: '10px 0' }}>female</div>
              </div>
              <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                <a href="#" className="edit_storyteller_link">Edit Storyteller</a>
              </div>
            </div>

            {/* ── Right content ── */}
            <div style={{ width: '100%', flex: '1 1 0', padding: '1rem' }} className="account_inner p-3 pt-4 content-col">
              <div className="title_text" style={{ marginBottom: '1.5rem' }}>
                <span>Your Personal</span> Statistics
              </div>

              {/* Activity chart + Favorites */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                <div style={{ flex: '1 1 300px' }}>
                  <div className="account_inner_components p-3">
                    <div className="subtitle" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                      <i className="icon_small">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 12.98" width="15" height="15">
                          <path d="M3.5,18.49l6-6.01,4,4L22,6.92,20.59,5.51,13.5,13.48l-4-4L2,16.99Z" transform="translate(-2 -5.51)" fill="#471fab"/>
                        </svg>
                      </i>
                      Activity
                    </div>
                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={280} />
                  </div>
                </div>

                <div style={{ flex: '0 1 280px' }}>
                  <div className="account_inner_components p-3" style={{ height: '100%' }}>
                    <div className="subtitle" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                      <i className="icon_small">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                          <path d="M16,16.69ZM8.59,28l2.79-9.12L4,13.6h9.12L16,4l2.88,9.6H28l-7.38,5.28L23.41,28,16,22.36Zm3.3-4.89L16,19.99l4.11,3.12-1.65-5.19,3.78-2.46H17.71L16,10.27l-1.71,5.19H9.76l3.78,2.46Z" transform="translate(-4 -4)" fill="#471fab"/>
                        </svg>
                      </i>
                      Favorite books
                    </div>
                    <ol className="list-group" style={{ paddingTop: '1rem' }}>
                      {FAVORITES.map((f) => (
                        <li key={f.id} className="list-group-item">
                          <Link to={`/story/${f.id}`}>{f.title}</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="account_inner_components p-3">
                <div className="subtitle" style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <i className="icon_small"><TrophySVG /></i>
                  Achievements
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {ACHIEVEMENTS_PAGES[achPage].map((a) => (
                    <div key={a.title} style={{ flex: '1 1 200px' }}>
                      <div className={`achievement px-3 py-4${a.done ? '' : ' locked'}`}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <i className="icon_small" style={{ width: 50, height: 50, flexShrink: 0 }}>
                            <TrophySVG />
                          </i>
                          <div>
                            <div className="subtitle" style={{ fontSize: 12 }}>{a.title}</div>
                            <div className="basic_text text-center">{a.desc}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="carousel-dots" style={{ paddingTop: '1.5rem' }}>
                  {ACHIEVEMENTS_PAGES.map((_, i) => (
                    <button key={i} className={`carousel-dot${achPage === i ? ' active' : ''}`} onClick={() => setAchPage(i)} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        @media(min-width:992px){
          .sidebar-col{ flex: 0 0 33.333% !important; width: 33.333% !important; }
          .content-col{ flex: 0 0 66.666% !important; width: 66.666% !important; }
          .account .logo { display: block !important; }
        }
      `}</style>
    </>
  );
}
