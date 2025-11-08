'use client';

export default function AboutUs() {
  return (
    <section id="about-us" className="section about-us">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">About Us</div>
          <h2 className="section-title">Credit Rails for India's Real Economy</h2>
          <p className="section-description">
            Kubar Labs stitches lender-grade workflows with marketplace operations so MSMEs access capital inside the tools they already use.
          </p>
        </div>

        <div className="about-content">
          <div className="about-story">
            <h3>Our Mission</h3>
            <p>
              NavDhan is Kubar Labs' credit intelligence service. It embeds underwriting, verification, and disbursal logic directly into B2B marketplaces,
              ERP suites, and partner LOS/LMS systems so lenders unlock deeper MSME supply tiers without rebuilding their stack.
            </p>
            <p>
              By bringing account aggregator data, GST trails, and live operational signals into one credit view, we reduce cost-to-serve and deliver
              fast, inclusive financing for export-focused MSMEs as well as frontline distributors.
            </p>
          </div>

          <div className="value-props">
            <div className="value-card">
              <div className="value-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Embedded Deployments</h4>
              <p>Plug-and-play APIs connect to partner LOS/LMS systems, onboarding NBFCs and banks without heavy integration cycles.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h4>Supply-Chain Signals</h4>
              <p>Sector-specific underwriting blends GST, logistics, and marketplace data to surface cash-flow lending opportunities.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Lifecycle Automation</h4>
              <p>Automation across origination, collections, and borrower engagement decreases turnaround time and default risk.</p>
            </div>
          </div>

          <div className="tech-section">
            <h3>How We Do It</h3>
            <p className="tech-intro">
              Kubar Labs unifies ONDC, OCEN, Account Aggregator, and marketplace data into one protocol, so every stakeholder shares the same trusted view of MSME creditworthiness.
            </p>
            <div className="tech-features">
              <div className="tech-feature">
                <span className="tech-check">✓</span>
                <span>Securely orchestrate marketplace, GST, ERP, and AA datasets</span>
              </div>
              <div className="tech-feature">
                <span className="tech-check">✓</span>
                <span>Agentic DSA workflows that collect deeper borrower intelligence</span>
              </div>
              <div className="tech-feature">
                <span className="tech-check">✓</span>
                <span>Credit models tuned for export, manufacturing, and services clusters</span>
              </div>
              <div className="tech-feature">
                <span className="tech-check">✓</span>
                <span>Works natively on ONDC with pathways to 30+ B2B marketplaces</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-us {
          background: var(--color-surface);
        }

        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto var(--spacing-2xl);
        }

        .section-badge {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          color: var(--color-primary);
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--spacing-md);
        }

        .section-title {
          margin-bottom: var(--spacing-md);
          color: var(--color-text-primary);
        }

        .section-description {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        .about-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .about-story {
          margin-bottom: var(--spacing-2xl);
          padding: var(--spacing-xl);
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 12px;
        }

        .about-story h3 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-md);
        }

        .about-story p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-md);
        }

        .about-story p:last-child {
          margin-bottom: 0;
        }

        .value-props {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }

        .value-card {
          padding: var(--spacing-lg);
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          transition: all var(--transition-base);
        }

        .value-card:hover {
          border-color: rgba(74, 158, 255, 0.3);
          transform: translateY(-2px);
        }

        .value-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          color: var(--color-primary);
          margin-bottom: var(--spacing-md);
        }

        .value-card h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .value-card p {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        .tech-section {
          padding: var(--spacing-xl);
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 12px;
        }

        .tech-section h3 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-md);
        }

        .tech-intro {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-lg);
        }

        .tech-features {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .tech-feature {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          font-size: 1rem;
          color: var(--color-text-secondary);
        }

        .tech-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: rgba(74, 158, 255, 0.15);
          border: 1px solid rgba(74, 158, 255, 0.3);
          border-radius: 50%;
          color: var(--color-primary);
          font-weight: 600;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .value-props {
            grid-template-columns: 1fr;
          }

          .section-description {
            font-size: 1.125rem;
          }

          .about-story h3,
          .tech-section h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

