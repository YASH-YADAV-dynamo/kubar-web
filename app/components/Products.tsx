'use client';

import Link from 'next/link';
import Image from 'next/image';

const useCases = [
  {
    key: 'cash',
    title: 'Cash-Flow Loans',
    description: 'Disburse working capital in hours using live transaction data, verified GST filings, and Account Aggregator feeds to give lenders a 360° view of every business they finance.'
  },
  {
    key: 'invoice',
    title: 'Faster, Smarter, Embedded Lending',
    description: 'Automate GST and e-invoice validation to finance MSME receivables and reduce underwriting friction.'
  },
  {
    key: 'checkout',
    title: 'Checkout Financing',
    description: 'Enables lenders to assess, approve, and service MSME loans directly through the platforms where businesses already operate, like marketplaces, ERPs, supplier apps, or payment systems.'
  }
];

const differentiators = [
  'Unified validation from GST, Account Aggregator, and marketplace sources',
  'Sector-specific scoring models built for manufacturing, trading, and services',
  'Embedded disbursal flows through eNACH, UPI, and DLT-powered smart contracts',
  'Continuous monitoring for better risk visibility and healthier portfolios'
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
        <div className="back-button-container">
          <Link href="/" className="back-button" aria-label="Back to Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M14 8L10 12L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <header className="products-hero">
          <div className="logo-container">
            <Image
              src="/navdhan_logo.png"
              alt="NavDhan Logo"
              width={200}
              height={80}
              className="navdhan-logo"
              priority
            />
          </div>
          <h1>Smart Credit Infrastructure for India's MSMEs</h1>
          <p>
            NavDhan by Kubar Labs powers embedded lending for the next generation of MSME finance. It connects lenders, marketplaces, and business platforms in one place to make credit flow where business actually happens.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/contact#contact-form">Book a Demo</Link>
          </div>
          <p style={{ marginTop: 'var(--spacing-xl)', fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
            Making credit available at the right time.
          </p>
          <p style={{ marginTop: 'var(--spacing-md)', fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
            Thousands of businesses in India struggle to secure loans while working capital gradually disappears into receivables. At the same time, banks and NBFCs struggle to find the right borrowers spending months verifying data and chasing documentation.
          </p>
          <p style={{ marginTop: 'var(--spacing-md)', fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
            NavDhan makes MSME lending faster, smarter, and deeply embedded. It bridges this gap, connecting lenders and businesses through live, verified transaction data at the exact point of need.
          </p>
        </header>

        <div className="navdhan-hero-image">
          <img 
            src="https://cdn.discordapp.com/attachments/1414510618521632771/1437482917617074176/NavDhan_by_Kubar_Labs.png?ex=691367ca&is=6912164a&hm=e1f0d235a5decba3106459ec18b02ffbaf8760da17fae304adf85cf8a72b63cc"
            alt="NavDhan by Kubar Labs"
            className="navdhan-image"
          />
        </div>

        <section className="usecases" id="usecases">
          <h2>Use Cases</h2>
          <div className="usecase-grid">
            {useCases.map((item) => (
              <article key={item.key} className="usecase-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="differentiators">
          <h2>Why NavDhan Works</h2>
          <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            Traditional credit models rely on paperwork and assumptions. We rely on proof.
          </p>
          <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            NavDhan uses real-time signals from business operations to assess creditworthiness more accurately than any static report.
          </p>
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
          <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            Integrated at every layer of the financial stack. NavDhan connects seamlessly with:
          </p>
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

        .back-button-container {
          margin-bottom: var(--spacing-xl);
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: transparent;
          border: none;
          border-radius: 50%;
          color: #ffffff;
          text-decoration: none;
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-4px);
        }

        .back-button:active {
          transform: translateX(-2px);
        }

        .back-button svg {
          width: 24px;
          height: 24px;
        }

        .products-hero {
          text-align: center;
          max-width: 900px;
          margin: 0 auto var(--spacing-3xl);
        }

        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .navdhan-logo {
          height: auto;
          width: auto;
          max-width: 200px;
          max-height: 80px;
          object-fit: contain;
        }

        .products-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          margin-bottom: var(--spacing-lg);
          color: var(--color-text-primary);
        }

        [data-page="navdhan"] .products-hero h1 {
          color: #000000 !important;
        }

        .products-hero p {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-2xl);
        }

        [data-page="navdhan"] .products-hero p {
          color: #333333 !important;
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


        .navdhan-hero-image {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto var(--spacing-3xl);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .navdhan-image {
          width: 100%;
          height: auto;
          max-width: 100%;
          object-fit: contain;
          border-radius: 20px;
        }

        [data-page="navdhan"] .navdhan-hero-image {
          margin-bottom: var(--spacing-3xl);
        }

        @media (max-width: 768px) {
          .navdhan-hero-image {
            margin-bottom: var(--spacing-2xl);
            padding: 0 var(--content-padding);
          }

          .navdhan-image {
            border-radius: 16px;
          }
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
          border-color: #ffd700;
        }

        .icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          color: #ffd700;
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
          color: #ffd700;
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

        [data-page="navdhan"] .products {
          background: #fefefe !important;
          color: #333333 !important;
        }

        [data-page="navdhan"] .products .back-button {
          color: #333333 !important;
        }

        [data-page="navdhan"] .products .back-button:hover {
          background: rgba(255, 165, 0, 0.1) !important;
          color: #ff8c00 !important;
        }

        [data-page="navdhan"] .products .usecase-grid {
          background: transparent !important;
        }

        [data-page="navdhan"] .products .usecase-card,
        [data-page="navdhan"] .products .list-item,
        [data-page="navdhan"] .products .integration-card {
          background: #ffffff !important;
          border: 1px solid rgba(255, 165, 0, 0.2) !important;
          box-shadow: 0 2px 8px rgba(255, 165, 0, 0.05) !important;
        }

        [data-page="navdhan"] .products .usecase-card:hover {
          border-color: rgba(255, 165, 0, 0.5) !important;
          background: #fffef9 !important;
          box-shadow: 0 4px 16px rgba(255, 165, 0, 0.15) !important;
          transform: translateY(-2px) !important;
        }

        [data-page="navdhan"] .products .icon {
          background: #ffffff !important;
          border-color: rgba(255, 165, 0, 0.3) !important;
          color: #ff8c00 !important;
        }

        [data-page="navdhan"] .products .icon svg {
          color: #ff8c00 !important;
          stroke: #ff8c00 !important;
        }

        [data-page="navdhan"] .products .icon svg * {
          stroke: #ff8c00 !important;
        }

        [data-page="navdhan"] .products .usecase-card h3,
        [data-page="navdhan"] .products .integration-card h3 {
          color: #333333 !important;
        }

        [data-page="navdhan"] .products .usecase-card p,
        [data-page="navdhan"] .products .list-item p,
        [data-page="navdhan"] .products .integration-card ul {
          color: #555555 !important;
        }

        [data-page="navdhan"] .products .integration-card li {
          color: #555555 !important;
        }

        [data-page="navdhan"] .products .usecases,
        [data-page="navdhan"] .products .differentiators,
        [data-page="navdhan"] .products .integrations {
          background: transparent !important;
        }

        [data-page="navdhan"] .products .check {
          background: rgba(255, 165, 0, 0.15) !important;
          border-color: rgba(255, 165, 0, 0.3) !important;
          color: #ff8c00 !important;
        }

        [data-page="navdhan"] .products .actions .btn-primary {
          display: none !important;
        }

        [data-page="navdhan"] .products .actions {
          justify-content: center !important;
        }
      `}</style>
    </section>
  );
}

