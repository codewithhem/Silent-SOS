import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import TrustedContacts from "../components/TrustedContacts/TrustedContacts";
import SafetyFeatures from "../components/SafetyFeatures/SafetyFeatures";
import EmergencyCTA from "../components/EmergencyCTA/EmergencyCTA";
import Footer from "../components/Footer/Footer";
function Home() {
  return (
    <div className="home">
      <Hero />
      <HowItWorks />
      <SafetyFeatures />
      <TrustedContacts />
      <EmergencyCTA />
      <Footer />
    </div>
  );
}

export default Home;