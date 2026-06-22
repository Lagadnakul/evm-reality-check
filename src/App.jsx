import Navbar from './components/layout/Navbar';
import HeroSection from './sections/HeroSection';
import VotingDemoSection from './sections/VotingDemoSection';
import MythRealitySection from './sections/MythRealitySection';
import SecurityLayersSection from './sections/SecurityLayersSection';
import FAQSection from './sections/FAQSection';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <HeroSection />
        <VotingDemoSection />
        <MythRealitySection />
        <SecurityLayersSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
