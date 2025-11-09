'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LearnWithKubar from '../components/LearnWithKubar';

export default function BlogPage() {
  useEffect(() => {
    // Load Substack embed script
    if (typeof window !== 'undefined' && !document.querySelector('script[data-loader="substack-embed"]')) {
      const loader = document.createElement('script');
      loader.src = 'https://substackcdn.com/embed.js';
      loader.async = true;
      loader.setAttribute('data-loader', 'substack-embed');
      document.body.appendChild(loader);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <h1>From the Kubar Labs Notebook</h1>
            <p>Sharing our insights from building India's first MSME-focused plug-and-play Embedded Business-Credit marketplace!</p>
          </div>
        </section>

        <section className="blog-embeds">
          <div className="container">
            <div className="embed-grid">
              <article className="embed-card">
                <header className="embed-header">
                  <h2>Building India's B2B Credit Infrastructure</h2>
                  <p>Part 1 of 6 · The infrastructure vs. application question for MSME lending.</p>
                </header>
                <div className="embed-wrapper">
                  <div className="substack-post-embed">
                    <p lang="en">Building India's B2B Credit Infrastructure: The Case for Population-Scale, Verifiable, and Cost-Efficient MSME Lending by Vaibhav Sharma</p>
                    <p>Part 1 of 6: The Infrastructure vs. Application Question</p>
                    <a data-post-link href="https://kubarlabs.substack.com/p/building-indias-b2b-credit-infrastructure">Read on Substack</a>
                  </div>
                </div>
              </article>
              <article className="embed-card">
                <header className="embed-header">
                  <h2>The Economics Are Broken (And Everyone Knows It)</h2>
                  <p>Part 2 of 6 · Why traditional lending fails MSMEs and what metrics matter.</p>
                </header>
                <div className="embed-wrapper">
                  <div className="substack-post-embed">
                    <p lang="en">The Economics Are Broken (And Everyone Knows It But Nobody Has Fixed it ... Yet) by Vaibhav Sharma</p>
                    <p>Part 2 of 6: Why Traditional Lending Fails MSMEs and What Metrics Actually Matter</p>
                    <a data-post-link href="https://kubarlabs.substack.com/p/the-economics-are-broken-and-everyone">Read on Substack</a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <LearnWithKubar />
      </main>
      <Footer />
    </>
  );
}

