import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "About — Kubar Labs",
  description: "Discover Kubar Labs' mission to connect MSMEs with lenders through NavDhan's credit intelligence protocol.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-page">
        <section className="about-hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <h1>Kubar Labs is building the credit layer for India's MSMEs.</h1>
                <p>
                  From embedded LOS/LMS integrations to agentic DSA flows, we orchestrate every step of MSME lending so lenders ship
                  capital faster, with lower risk, across ONDC and major B2B trade platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pillars">
          <div className="container">
            <div className="pillars-grid">
              <article className="pillar-card">
                <span className="pillar-index">01</span>
                <div>
                  <h3>Embedded Credit Ops</h3>
                  <p>Deploy lender-grade workflows inside marketplaces, ERPs, and partner LOS/LMS stacks without rebuilding your stack.</p>
                </div>
              </article>
              <article className="pillar-card">
                <span className="pillar-index">02</span>
                <div>
                  <h3>Agentic Onboarding</h3>
                  <p>Automate MSME data collection with guided DSA journeys that surface deeper operating telemetry for faster decisions.</p>
                </div>
              </article>
              <article className="pillar-card">
                <span className="pillar-index">03</span>
                <div>
                  <h3>Lifecycle Intelligence</h3>
                  <p>Unify underwriting, disbursal, and collections signals so lenders manage risk and growth from the same dashboard.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="credit-engine">
          <div className="container">
            <div className="engine-card">
              <h2>NavDhan Credit Intelligence Engine</h2>
              <p>
                NavDhan unifies structured datasets from India Stack, AA, GST, and payment rails with unstructured marketplace operations.
                The result is a single, verifiable credit view that powers co-lending, supply-chain finance, and embedded checkout lending.
              </p>
              <div className="engine-columns">
                <article className="engine-column">
                  <span className="engine-index">01</span>
                  <div>
                    <h3>Data Inputs</h3>
                    <ul className="engine-list">
                      <li>Account Aggregator & banking cashflows</li>
                      <li>GST, e-invoice, logistics manifests</li>
                      <li>Marketplace & ERP order telemetry</li>
                      <li>Informal docs captured via agentic DSA</li>
                    </ul>
                  </div>
                </article>
                <article className="engine-column">
                  <span className="engine-index">02</span>
                  <div>
                    <h3>Outputs</h3>
                    <ul className="engine-list">
                      <li>Sector-specific risk scores & pricing tiers</li>
                      <li>Automated underwriting & decisioning APIs</li>
                      <li>Lifecycle automation across disbursal & recovery</li>
                      <li>Faster MSME working capital disbursement</li>
                    </ul>
                  </div>
                </article>
                <article className="engine-column">
                  <span className="engine-index">03</span>
                  <div>
                    <h3>Highlights</h3>
                    <ul className="engine-list">
                      <li>Composable APIs support co-lending, supply-chain, and embedded checkout products.</li>
                      <li>Shared control center lets lenders, marketplaces, and partners track the same risk posture.</li>
                      <li>Agentic ops workflows automate document capture, monitoring, and borrower nudges.</li>
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-card">
              <h2>Partner with Kubar Labs</h2>
              <p>Whether you manage MSME credit, run a marketplace, or build ERP tools, we can activate NavDhan inside your workflow.</p>
              <div className="cta-actions">
                <Link className="btn btn-primary" href="/contact#contact-form">Book a Demo</Link>
                <Link className="btn btn-secondary" href="mailto:partner@navdhan.com">Partner Enquiries</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

