import React from "react";
import Header from "./components/Header/Header";
import Stories from "./components/Stories/Stories";
import Footer from "./components/Footer/Footer";
import { cigarBanner, heroBanner, fullBanner } from "./elements";
import "./main.css";

function App() {
  return (
    <div className="crf">
      <Header />
      {heroBanner}
      {cigarBanner}
      <Stories />
      {fullBanner}
      <Footer />
    </div>
  );
}

export default App;
