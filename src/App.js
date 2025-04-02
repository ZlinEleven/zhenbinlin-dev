import Navbar from "./components/Navbar";
import Experience from "./components/Experience/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer/Footer";
import Skills from "./components/Skills/Skills";
import Education from "./components/Education/Education";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WheelTracker from "./components/Project/WheelTracker";
import AllowanceCalculator from "./components/Project/AllowanceCalculator";


function App() {
    const rootpage = (
        <div className="App">
            <Navbar />
            <About />
            <Education />
            <Skills />
            <Experience />
            <Contact />
            <Footer />
        </div>
    )

    return (
        <Router>
            <Routes>
                <Route path="/" element={rootpage} />
                <Route path="/project/wheel" element={<WheelTracker />} />
                <Route path="/project/allowance-calculator" element={<AllowanceCalculator />} />
            </Routes>
        </Router>
    );
}

export default App;
