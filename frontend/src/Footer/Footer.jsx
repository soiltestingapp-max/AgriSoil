import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container py-5">
        <div className="row">

          {/* Left Section */}
          <div className="col-lg-4 mb-4">
            <h4 className="footer-logo">
              <i className="fas fa-leaf me-2"></i>
              AgriSoil
            </h4>
            <p className="footer-desc">
              Empowering farmers with data-driven insights to build a more
              sustainable and productive future for agriculture.
            </p>

            <div className="footer-social">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-facebook-f"></i>
              <i className="fas fa-share-alt"></i>
            </div>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-4 mb-4">
            <h6 className="footer-heading">Services</h6>
            <ul>
              <li>Soil Analysis</li>
              <li>Custom Fertilizers</li>
              <li>Farm Consulting</li>
              <li>Marketplace</li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-4 mb-4">
            <h6 className="footer-heading">Company</h6>
            <ul>
              <li>About Us</li>
              <li>Case Studies</li>
              <li>Sustainability</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-4 mb-4">
            <h6 className="footer-heading">Support</h6>
            <ul>
              <li>Help Center</li>
              <li>Shipping Info</li>
              <li>Lab Locations</li>
              <li>Terms of Service</li>
            </ul>
          </div>

        </div>

        <hr />

        <div className="footer-bottom d-flex justify-content-between flex-wrap">
          <span>
            © 2026 AgriSoil Agricultural Solutions Inc. All rights reserved.
          </span>
          <div>
            <span className="me-3">🌍 English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}