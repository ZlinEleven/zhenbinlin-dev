import Navbar from "./components/Navbar";
import Experience from "./components/Experience/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <About/>
      <Experience/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
