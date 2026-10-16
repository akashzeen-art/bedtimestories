import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 15px' }} />
      </div>
      <Footer />
    </>
  );
}
