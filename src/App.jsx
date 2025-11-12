import './App.css';
import Gallery from './Components/Gallery.jsx';
import SponsorsCarousel from './Components/SponsorsCarousel.jsx';

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Gallery />
      </main>

      {/* Sponsors Carousel */}
      <section className="sponsors-section">
        <SponsorsCarousel />
      </section>


      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Idavazhi Arts & Sports Club • Gallery
      </footer>
    </div>
  );
}

export default App;
