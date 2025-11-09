'use client';

import Image from 'next/image';

export default function ExpandBussiness() {
  return (
    <section className="expand-business-section">
      {/* Main Heading */}
      <h1 className="expand-heading">
        Expand Your Business with Kubar
      </h1>

      {/* Gradient Overlay Container */}
      <div className="expand-container">
        {/* Left Gradient */}
        <div className="expand-gradient expand-gradient-left" />

        {/* Right Gradient */}
        <div className="expand-gradient expand-gradient-right" />

        {/* Image Container */}
        <div className="expand-images-wrapper">
          <div className="expand-images">
            {/* Card 1 */}
            <div className="expand-image-item">
              <Image
                src="/card1.svg"
                alt="Card 1"
                width={256}
                height={320}
                className="expand-image"
              />
            </div>

            {/* Card 2 */}
            <div className="expand-image-item">
              <Image
                src="/card2.svg"
                alt="Card 2"
                width={256}
                height={320}
                className="expand-image"
              />
            </div>

            {/* Card 3 */}
            <div className="expand-image-item">
              <Image
                src="/card3.svg"
                alt="Card 3"
                width={256}
                height={320}
                className="expand-image"
              />
            </div>

            {/* Card 4 */}
            <div className="expand-image-item">
              <Image
                src="/card4.svg"
                alt="Card 4"
                width={256}
                height={320}
                className="expand-image"
              />
            </div>

            {/* Card 5 */}
            <div className="expand-image-item">
              <Image
                src="/card5.svg"
                alt="Card 5"
                width={256}
                height={320}
                className="expand-image"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .expand-business-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
          background: var(--color-background);
          position: relative;
        }

        .expand-heading {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-2xl);
          color: var(--color-text-primary);
          font-family: var(--font-heading);
        }

        .expand-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .expand-gradient {
          position: absolute;
          top: 0;
          width: 401.9px;
          height: 479.6px;
          z-index: 10;
          pointer-events: none;
        }

        .expand-gradient-left {
          left: 0;
          background: linear-gradient(to right, var(--color-background), transparent);
        }

        .expand-gradient-right {
          right: 0;
          background: linear-gradient(to left, var(--color-background), transparent);
        }

        .expand-images-wrapper {
          width: 100%;
          padding: 0 var(--content-padding);
        }

        .expand-images {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .expand-images::-webkit-scrollbar {
          display: none;
        }

        .expand-image-item {
          width: calc(20% - 16px);
          min-width: 200px;
          height: 256px;
          flex-shrink: 0;
        }

        .expand-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @media (min-width: 768px) {
          .expand-image-item {
            height: 288px;
          }
        }

        @media (min-width: 1024px) {
          .expand-image-item {
            height: 320px;
          }
        }

        @media (max-width: 767px) {
          .expand-gradient {
            width: 100px;
            height: 100%;
          }
        }
      `}</style>
    </section>
  );
}

