import Navbar from "./components/Navbar";
import Experience from "./components/Experience/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer/Footer";
import Skills from "./components/Skills/Skills";
import Education from "./components/Education/Education";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import WheelTracker from "./components/Project/WheelTracker";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <div>
                            <Navbar />
                            <About />
                            <Education />
                            <Skills />
                            <Experience />
                            <Contact />
                            <Footer />
                        </div>
                    } />
                    <Route path="/wheel" element={<WheelTracker/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
