import Navbar from './components/Navbar';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Contact from './components/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
