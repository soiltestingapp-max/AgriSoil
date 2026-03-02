import "./Newsletter.css";

export default function Newsletter() {
  return (
    <section className="newsletter-section py-5">
      <div className="container">
        <div className="newsletter-box row align-items-center">

          {/* LEFT SIDE */}
          <div className="col-lg-7 text-white">

            <h2 className="newsletter-title">
              Join the Agricultural Revolution
            </h2>

            <p className="newsletter-text mt-3">
              Stay updated with the latest soil management tips, market trends,
              and exclusive product discounts delivered weekly.
            </p>

            <div className="newsletter-form mt-4 d-flex flex-wrap">
              <input
                type="email"
                className="form-control email-input"
                placeholder="Enter your email"
              />
              <button className="btn subscribe-btn ms-3">
                Subscribe
              </button>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-5 text-center mt-4 mt-lg-0">
            <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Crop" className="newsletter-img" />
          </div>

        </div>
      </div>
    </section>
  );
}