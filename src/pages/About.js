import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import '../style/About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-us-container">
        <h1>About Us</h1>
        <p>Welcome to our website! We are a passionate team dedicated to providing high-quality solutions in the field of theoretical physics.</p>
        
        <h2>Team</h2>
        <p>At our company, we strive to push the boundaries of scientific research and innovation. Our team of experts, consisting of renowned physicists and researchers, work tirelessly to unravel the mysteries of the universe.</p>

        <h2>Our Mission</h2>
        <p>We are committed to:</p>
        <ul>
          <li>Cutting-edge simulations and modeling</li>
          <li>Advanced frameworks and tools</li>
          <li>Innovative research and discoveries</li>
          <li>Collaborative projects and partnerships</li>
        </ul>
          <a href="/contact" className><h2>Contact Us</h2></a>
        <p>For any inquiries or collaborations, please don't hesitate to reach out to us. We would love to hear from you!</p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
