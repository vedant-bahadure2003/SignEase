import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faGlobe,
  faUniversalAccess,
  faHandshake,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800">
      <div className="footer-content">
        {/* Project Info Section */}
        <div className="footer-section">
          <h3 className="footer-title">
            <FontAwesomeIcon icon={faUniversalAccess} className="footer-icon" />
            SignEase 2.0
          </h3>
          <p className="footer-description">
            Advanced AI-powered sign language recognition system enabling
            seamless communication between deaf and hearing communities through
            real-time gesture interpretation and voice synthesis.
          </p>
          <div className="footer-features">
            <div className="feature-item">
              <FontAwesomeIcon icon={faBrain} />
              <span>AI Recognition</span>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faGlobe} />
              <span>Multi-language</span>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faHandshake} />
              <span>Accessibility</span>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Technology Stack</h4>
          <div className="tech-stack">
            <span className="tech-item">React.js</span>
            <span className="tech-item">TensorFlow</span>
            <span className="tech-item">Computer Vision</span>
            <span className="tech-item">Machine Learning</span>
            <span className="tech-item">Web Speech API</span>
            <span className="tech-item">MediaPipe</span>
          </div>
        </div>

        {/* Project Links */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Project Resources</h4>
          <div className="footer-links">
            <a
              href="https://github.com/vedant-bahadure2003/signEase-Backend"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span>Source Code</span>
            </a>
            <a
              href="mailto:vedantbahadure2003@gmail.com"
              className="footer-link"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Contact</span>
            </a>
            <a
              href="https://www.linkedin.com/in/vedant-bahadure-269893250/"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} SignEase 2.0. Made with{" "}
            <FontAwesomeIcon icon={faHeart} className="heart-icon" /> for
            accessible communication.
          </p>
          <p className="attribution">
            Developed by <strong>Team "Tha Tha Thi Thi"</strong> | Empowering
            inclusive communication through technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
