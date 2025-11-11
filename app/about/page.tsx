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
                <h1>Our Mission</h1>
                <p>
                  Building the future of MSME finance, one connection at a time.
                </p>
                <p>
                  Kubar Labs was born out of a simple truth. Small businesses move India forward, but the system that should support them often holds them back.
                </p>
                <p>
                  We're here to change that.
                </p>
                <p>
                  At Kubar Labs, we're building the digital foundation that connects lenders and small businesses through trust, data, and understanding. We want every business owner, no matter where they are or what they make, to have fair access to credit when they need it most.
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
                  <h3>How It All Started</h3>
                  <p>It began with a question that never left us. Why does getting a loan still feel like a battle for India's small business owners? We met entrepreneurs who had steady orders, clean GST filings, and strong customers, yet still waited months for approvals. And we met lenders who wanted to help, but couldn't see the full picture. Data was scattered. Documents were incomplete. The trust gap kept growing. That gap became our mission. We decided to build a bridge between MSMEs and lenders, not through middlemen, but through verified data, shared securely and used intelligently. That idea became NavDhan, our first product. And the company behind it became Kubar Labs, a space where technology meets empathy, and where financial inclusion means more than just a line in a report.</p>
                </div>
              </article>
              <article className="pillar-card">
                <span className="pillar-index">02</span>
                <div>
                  <h3>Our Vision</h3>
                  <p>We're building the rails for a fairer financial system. Our goal is simple. We want to make credit flow where business happens. We're creating systems that help banks and NBFCs understand MSMEs better, and help MSMEs find credit without friction. We take the complexity out of data, the delay out of lending, and the guesswork out of credit. Every connection we build brings us closer to a future where small businesses are seen for their strength, not their size. That's the world we want to live in and that's the one we're building.</p>
                </div>
              </article>
              <article className="pillar-card">
                <span className="pillar-index">03</span>
                <div>
                  <h3>Meet the Team</h3>
                  <p>Built by people who believe in small business. We've worked with MSMEs, visiting workshops, sitting with accountants, talking to lenders, and learning how things really work. We understand what it means to wait for a payment that's already overdue. We've seen how a single loan can change the course of a business. That's why we're building Kubar Labs — to bring understanding back into finance, and to give small businesses the recognition they deserve.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="credit-engine">
          <div className="container">
            <div className="engine-card">
              <h2>Closing Message</h2>
              <p>
                The future of finance will be built in small factories, shops, and workshops across India. If we can make credit flow to them easily, fairly, and transparently, we can reshape the story of growth in this country.
              </p>
              <p>
                That's what we're here for.
              </p>
              <p>
                That's what Kubar Labs stands for.
              </p>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-card">
              <h2>Join our mission</h2>
              <div className="cta-actions">
                <Link className="btn btn-primary" href="/contact#contact-form">Partner with us</Link>
                <Link className="btn btn-secondary" href="/contact#contact-form">Join our Whatsapp Community</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

