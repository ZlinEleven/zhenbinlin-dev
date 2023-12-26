import Navbar from "./components/Navbar";
import Experience from "./components/Experience/Experience";
import About from "./components/About";
import Contact from "./components/Contact";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <About/>
      <Experience/>
      <Contact/>
    </div>
  );
}

export default App;
