import Navbar from "./components/Navbar";
import Experience from "./components/Experience/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer/Footer";
import Skills from "./components/Skills/Skills";
import Education from "./components/Education/Education";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <About/>
      <Education/>
      <Skills/>
      <Experience/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
