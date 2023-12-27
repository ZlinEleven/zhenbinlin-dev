import Navbar from "./components/Navbar";
import Experience from "./components/Experience/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer/Footer";
import Skills from "./components/Skills/Skills";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <About/>
      <Skills/>
      <Experience/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
