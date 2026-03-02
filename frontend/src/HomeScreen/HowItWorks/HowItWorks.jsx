import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <section className="how-section py-5">
      <div className="container text-center">

        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Getting scientific insights into your farm shouldn't be complicated.
          Our 3-step process delivers professional results directly to your phone.
        </p>

        <div className="row mt-5">

          {/* Step 1 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="how-card">
              <div className="icon-box">
                <i className="fas fa-flask"></i>
              </div>
              <h5>1. Sample</h5>
              <p>
                Collect a soil sample using our easy-to-use guide and pre-paid
                testing kit provided by AgriSoil.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="how-card">
              <div className="icon-box">
                <i className="fas fa-truck"></i>
              </div>
              <h5>2. Submit</h5>
              <p>
                Drop your sample at any partner location or mail it directly
                to our certified agricultural laboratory.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="how-card">
              <div className="icon-box">
                <i className="fas fa-chart-line"></i>
              </div>
              <h5>3. Succeed</h5>
              <p>
                Receive detailed digital reports and tailored recommendations
                to optimize your crop yields and soil health.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}