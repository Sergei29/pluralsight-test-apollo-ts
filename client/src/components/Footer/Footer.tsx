import React from "react";

const Footer: React.FC = () => (
  <footer className="d-flex justify-content-stretch">
    <div className="crf-footer--category">
      <div className="container">
        <div className="row row d-md-flex justify-content-between flex-sm-column flex-lg-row">
          <div className="crf-footer--links active">
            <div className="crf-footer--header text-primary">
              Customer Support
            </div>
            <ul>
              <li>
                <a href="http://some-link-to-resource">Contact Us</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Order Tracker</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Returns &amp; Refunds</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Size Guide</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Store Locator</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Site Map</a>
              </li>
            </ul>
          </div>
          <div className="crf-footer--links">
            <div className="crf-footer--header text-primary">Company Info</div>
            <ul>
              <li>
                <a href="http://some-link-to-resource">About Us</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Careers</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Press</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Sustainability</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Affiliates</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Students</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Mobile Apps</a>
              </li>
            </ul>
          </div>
          <div className="crf-footer--links">
            <div className="crf-footer--header text-primary">
              Privacy &amp; Terms
            </div>
            <ul>
              <li>
                <a href="http://some-link-to-resource">
                  Privacy &amp; Security
                </a>
              </li>
              <li>
                <a href="http://some-link-to-resource">Statement</a>
              </li>
              <li>
                <a href="http://some-link-to-resource">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="crf-footer--links crf-footer--social">
            <div className="crf-footer--header text-primary d-lg-block d-none d-sm-none">
              Follow Us
            </div>
            <ul className="d-lg-block d-none d-sm-none">
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon twitter"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon facebook"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon pinterest"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon instagram"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon googleplus"
                >
                  {" "}
                </a>
              </li>
            </ul>
            <div className="crf-footer--newsletter">
              <div className="crf-footer--header">Email Updates</div>
              <div className="crf-footer--subheader">
                Exclusive sales, special offers, and more.
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter email address"
              />
              <button className="btn btn-primary">Sign up</button>
            </div>
          </div>
          <div className="crf-footer--links crf-footer-m--social d-block d-lg-none">
            <div className="crf-footer--header text-primary">Follow Us</div>
            <ul>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon twitter"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon facebook"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon pinterest"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon instagram"
                >
                  {" "}
                </a>
              </li>
              <li>
                <a
                  href="http://some-link-to-resource"
                  className="crf-footer--icon googleplus"
                >
                  {" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="crf-footer--logo d-flex">
      <div className="container justify-content-start align-items-center d-flex flex-column">
        <img
          src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/logos/pluralsight-white.png"
          alt="rock climbing"
        />
        <div>
          This site is created for demonstrative purposes only and does not
          offer any real products or services.
        </div>
      </div>
    </div>
    <div className="crf-footer--copyright text-primary">@Pluralsight 2018</div>
  </footer>
);
export default Footer;
