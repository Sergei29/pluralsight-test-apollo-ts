import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand flex-column flex-md-row header-nav--nav">
      <div className="container">
        <div className="d-md-flex justify-content-between">
          <div className="navbar-brand d-flex justify-content-between align-items-center">
            <a href="http://some-link-to-resource">
              <img
                alt="Carved Rock Fitness"
                src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/logos/carved-rock-logo.png"
              />
            </a>
            <button
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="navbar-toggle"
              data-target="#navbarNav"
              data-toggle="collapse"
              type="button"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center align-items-center"
            id="navbarNav"
          >
            <div className="header-nav--main">
              <form className="form-inline form-inline d-none d-sm-none d-md-block">
                <input
                  aria-label="Search"
                  className="form-control"
                  placeholder="What can we help you find?"
                  type="search"
                />
                <button className="btn btn-default" type="submit">
                  SEARCH
                </button>
              </form>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="http://some-link-to-resource">
                    Clothing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://some-link-to-resource">
                    Footwear
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://some-link-to-resource">
                    Equipment
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://some-link-to-resource">
                    Bags &amp; Travel
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://some-link-to-resource">
                    Trail Reviews
                  </a>
                </li>
              </ul>
            </div>
            <div className="header-nav--utilities d-flex align-items-center justify-content-end flex-row-reverse flex-row flex-md-row">
              <div className="account d-flex flex-column">
                John Doe <a href="http://some-link-to-resource">Log Out</a>
              </div>
              <div className="image">
                <img
                  alt="John Doe"
                  src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/profile-pic.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
