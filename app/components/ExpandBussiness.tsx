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
          overflow-x: visible;
          overflow-y: visible;
        }

        .expand-heading {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-2xl);
          color: var(--color-text-primary);
          font-family: var(--font-heading);
          padding: 0 var(--content-padding);
        }

        .expand-container {
          position: relative;
          width: 100%;
          overflow-x: visible;
          overflow-y: visible;
        }

        @media (min-width: 768px) {
          .expand-container {
            overflow: hidden;
          }
        }

        .expand-gradient {
          position: absolute;
          top: 0;
          width: 401.9px;
          height: 479.6px;
          z-index: 10;
          pointer-events: none;
          display: none;
        }

        @media (min-width: 768px) {
          .expand-gradient {
            display: block;
          }
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
          padding: 0;
          overflow-x: visible;
          overflow-y: visible;
        }

        @media (min-width: 768px) {
          .expand-images-wrapper {
            padding: 0 var(--content-padding);
          }
        }

        .expand-images {
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow-x: auto;
          overflow-y: visible;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          padding: 0.5rem var(--content-padding);
          width: 100%;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }

        .expand-images::-webkit-scrollbar {
          display: none;
        }

        .expand-image-item {
          flex-shrink: 0;
          height: 256px;
          width: auto;
          aspect-ratio: 256 / 320;
          overflow: visible;
        }

        .expand-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        @media (min-width: 768px) {
          .expand-images {
            justify-content: center;
            gap: 1.5rem;
          }

          .expand-image-item {
            height: 288px;
            flex: 0 0 auto;
          }
        }

        @media (min-width: 1024px) {
          .expand-images {
            gap: 2rem;
          }

          .expand-image-item {
            height: 320px;
          }
        }

        @media (max-width: 767px) {
          .expand-business-section {
            overflow-x: visible;
            overflow-y: visible;
          }

          .expand-heading {
            margin-bottom: var(--spacing-lg);
            padding: 0 var(--content-padding);
          }

          .expand-container {
            overflow-x: visible;
            overflow-y: visible;
          }

          .expand-images-wrapper {
            padding: 0;
            overflow-x: visible;
            overflow-y: visible;
          }

          .expand-images {
            gap: 0.75rem;
            padding: 0.5rem var(--content-padding);
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: visible;
            -webkit-overflow-scrolling: touch;
            width: 100%;
          }

          .expand-image-item {
            min-width: 110px;
            width: 110px;
            height: 138px;
            flex-shrink: 0;
            overflow: visible;
            position: relative;
          }

          .expand-image {
            width: 100%;
            height: 100%;
            max-width: 110px;
            max-height: 138px;
            object-fit: contain;
          }
        }

        @media (max-width: 480px) {
          .expand-images {
            gap: 0.5rem;
            padding: 0.5rem var(--content-padding);
          }

          .expand-image-item {
            min-width: 90px;
            width: 90px;
            height: 113px;
            overflow: visible;
          }

          .expand-image {
            max-width: 90px;
            max-height: 113px;
          }
        }
      `}</style>
    </section>
  );
}

