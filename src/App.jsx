import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Result from "./components/Result";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
