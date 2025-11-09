'use client';

import Link from 'next/link';

const useCases = [
  {
    key: 'cash',
    title: 'Cash-flow Loans',
    description: 'Disburse working capital in hours using live order, logistics, and payments data.'
  },
  {
    key: 'invoice',
    title: 'Invoice-Based Lending',
    description: 'Automate GST and e-invoice validation to finance MSME receivables without new paperwork.'
  },
  {
    key: 'checkout',
    title: 'Checkout Financing',
    description: 'Embed credit offers inside procurement and B2B commerce flows to capture higher order values.'
  }
];

const differentiators = [
  'Holistic validation across AA, GST, and marketplace sources',
  'Ultra-fast disbursal with automated LOS/LMS workflows',
  'Lifecycle automation for borrower engagement and collections',
  'Sector-specific intelligence for exports, manufacturing, and services'
];

const integrations = [
  {
    title: 'Marketplace & ERP Partners',
    points: ['ONDC trade channels', 'Top B2B procurement platforms', 'Inventory & receivable systems']
  },
  {
    title: 'Lender Systems',
    points: ['Core banking & CBS', 'LOS/LMS orchestration', 'CRM and compliance suites']
  },
  {
    title: 'Data Infrastructure',
    points: ['Account Aggregator (AA)', 'GSTN & e-invoice rails', 'UPI & cash-flow telemetry']
  }
];

export default function Products() {
  return (
    <section className="products">
      <div className="container">
        <header className="products-hero">
          <div className="badge">NavDhan</div>
          <h1>Credit Intelligence Service for MSME Lenders</h1>
          <p>
            NavDhan is Kubar Labs' credit intelligence service that embeds MSME underwriting, decisioning, and servicing inside the apps your
            borrowers already use. Integrate once to activate cash-flow lending, invoice financing, and checkout credit across marketplaces.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/contact#contact-form">Book a Demo</Link>
            <Link className="btn btn-secondary" href="mailto:partner@navdhan.com">Partner with Us</Link>
          </div>
        </header>

        <section className="usecases" id="usecases">
          <h2>Use Cases</h2>
          <div className="usecase-grid">
            {useCases.map((item) => (
              <article key={item.key} className="usecase-card">
                <div className="icon" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.key === 'cash' ? (
                      <>
                        <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                        <path d="M3 7v5l9 4.5L21 12V7" />
                        <path d="M9 11h6" />
                      </>
                    ) : item.key === 'invoice' ? (
                      <>
                        <path d="M6 2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
                        <path d="M15 2v5h5" />
                        <path d="M8 13h8" />
                        <path d="M8 17h6" />
                      </>
                    ) : (
                      <>
                        <path d="M3 5h2l1 7h11l1-5H6" />
                        <circle cx="9" cy="17" r="1" />
                        <circle cx="17" cy="17" r="1" />
                      </>
                    )}
                  </svg>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="differentiators">
          <h2>Why NavDhan Works</h2>
          <div className="list">
            {differentiators.map((line, index) => (
              <div key={index} className="list-item">
                <span className="check">✓</span>
                <p>{line}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="integrations" id="integrations">
          <h2>Integrations at Every Layer</h2>
          <div className="integration-grid">
            {integrations.map((section, index) => (
              <article key={index} className="integration-card">
                <h3>{section.title}</h3>
                <ul>
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .products {
          background: var(--color-background);
          padding: calc(var(--spacing-3xl) + 2rem) 0 var(--spacing-3xl);
          color: var(--color-text-primary);
        }

        .products-hero {
          text-align: center;
          max-width: 900px;
          margin: 0 auto var(--spacing-3xl);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: var(--spacing-md);
          background: var(--color-surface);
        }

        .products-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          margin-bottom: var(--spacing-lg);
          color: var(--color-text-primary);
        }

        .products-hero p {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-2xl);
        }

        .actions {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .actions :global(.btn-primary) {
          background: #FF8C00;
          color: #FFFFFF;
          border: none;
          box-shadow: 0 4px 20px rgba(255, 140, 0, 0.4);
        }

        .actions :global(.btn-primary:hover) {
          background: #FF9F1A;
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(255, 140, 0, 0.5);
        }

        .actions :global(.btn-secondary) {
          background: #00B85E;
          color: #FFFFFF;
          border: none;
          box-shadow: 0 4px 20px rgba(0, 184, 94, 0.4);
        }

        .actions :global(.btn-secondary:hover) {
          background: #00D670;
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(0, 184, 94, 0.5);
        }


        .usecases {
          margin-bottom: var(--spacing-3xl);
        }

        .usecases h2,
        .differentiators h2,
        .integrations h2 {
          font-size: clamp(2rem, 4vw, 2.75rem);
          text-align: center;
          margin-bottom: var(--spacing-2xl);
          color: var(--color-text-primary);
        }

        .usecase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: var(--spacing-xl);
        }

        .usecase-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: var(--spacing-xl);
          text-align: left;
          transition: transform var(--transition-base), border-color var(--transition-base);
        }

        .usecase-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-primary);
        }

        .icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-md);
        }

        .usecase-card h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-primary);
        }

        .usecase-card p {
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .differentiators {
          margin-bottom: var(--spacing-3xl);
        }

        .list {
          max-width: 760px;
          margin: 0 auto;
          display: grid;
          gap: var(--spacing-md);
        }

        .list-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: var(--spacing-lg);
        }

        .check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(163, 230, 53, 0.15);
          border: 1px solid rgba(163, 230, 53, 0.25);
          color: var(--color-primary);
          font-weight: 700;
          flex-shrink: 0;
        }

        .list-item p {
          color: var(--color-text-secondary);
        }

        .integrations {
          margin-bottom: 0;
        }

        .integration-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: var(--spacing-xl);
        }

        .integration-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: var(--spacing-xl);
        }

        .integration-card h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--color-text-primary);
        }

        .integration-card ul {
          list-style: none;
          display: grid;
          gap: 0.75rem;
          color: var(--color-text-secondary);
        }

        .integration-card li::before {
          content: '•';
          color: var(--color-accent);
          margin-right: 0.5rem;
        }

        @media (max-width: 768px) {
          .products {
            padding-top: calc(var(--spacing-3xl) + 1.5rem);
          }

          .products-hero p {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
}

