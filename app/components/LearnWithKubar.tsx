'use client';

export default function LearnWithKubar() {
  return (
    <section className="learn-with-kubar-section">
      {/* Overlay */}
      <div className="learn-overlay">
        <span className="learn-overlay-text">Coming Soon...</span>
      </div>

      {/* Content */}
      <div className="learn-content">
        <h1 className="learn-title">Learn with Kubar</h1>
        <p className="learn-subtitle">
          Listen to our Podcast to learn from Market Leaders
        </p>

        <div className="learn-grid">
          {/* First Card: spans 2 rows on desktop */}
          <div
            className="learn-card learn-card-large"
            style={{ backgroundImage: "url('/kubar-ka-kissa.png')" }}
          >
            <div className="learn-card-content">
              <span className="learn-card-title">Kubar Ka Kissa</span>
              <span className="learn-card-subtitle">Industry Learning Podcast</span>
            </div>
          </div>

          {/* Second Card */}
          <div
            className="learn-card"
            style={{ backgroundImage: "url('/vyapar-nama.jpg')" }}
          >
            <div className="learn-card-content">
              <span className="learn-card-title">Vyapar Nama By Kubar</span>
              <span className="learn-card-subtitle">Kubar's Newsletter</span>
            </div>
          </div>

          {/* Third Card */}
          <div
            className="learn-card"
            style={{ backgroundImage: "url('/udyogpedia.jpg')" }}
          >
            <div className="learn-card-content">
              <span className="learn-card-title">Udyogpedia</span>
              <span className="learn-card-subtitle">MSME Knowledge Base</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .learn-with-kubar-section {
          min-height: 80vh;
          background: var(--color-background);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: var(--spacing-3xl) var(--content-padding);
        }

        .learn-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.8) 50%,
            rgba(0, 0, 0, 0.4) 100%
          );
          pointer-events: none;
        }

        .learn-overlay-text {
          color: #ffffff;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          font-family: var(--font-heading);
        }

        .learn-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          padding: var(--spacing-lg);
        }

        .learn-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          text-align: center;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
          font-family: var(--font-heading);
        }

        .learn-subtitle {
          font-size: clamp(1.25rem, 2.5vw, 1.5rem);
          text-align: center;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-2xl);
        }

        .learn-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto;
          gap: var(--spacing-lg);
          height: auto;
        }

        .learn-card {
          border-radius: 16px;
          padding: var(--spacing-xl);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 300px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
        }

        .learn-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: 1;
        }

        .learn-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .learn-card-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600;
          color: #ffffff;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          font-family: var(--font-heading);
        }

        .learn-card-subtitle {
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          font-size: clamp(0.95rem, 1.5vw, 1.125rem);
        }

        @media (min-width: 640px) {
          .learn-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-xl);
            height: auto;
          }

          .learn-card {
            min-height: 350px;
          }

          .learn-card-large {
            grid-row: span 2;
            min-height: 100%;
          }
        }

        @media (min-width: 1024px) {
          .learn-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(2, 1fr);
            gap: var(--spacing-2xl);
            height: 544px;
          }

          .learn-card {
            min-height: auto;
            height: 100%;
            padding: var(--spacing-2xl);
          }

          .learn-card-large {
            grid-row: 1 / -1;
          }
        }

        @media (max-width: 639px) {
          .learn-with-kubar-section {
            min-height: auto;
            padding: var(--spacing-2xl) var(--content-padding);
          }

          .learn-card {
            min-height: 280px;
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
}

