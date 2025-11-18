'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

export default function ImageCarousel() {
  const images = Array.from({ length: 5 }, (_, i) => i + 1);

  const getImagePath = (id: number) => `/showcase/${id}.png`;

  return (
    <section className="showcase-section">
      <div className="container">
        <h2 className="showcase-heading">Product Showcase</h2>
        <div className="carousel-wrapper">
          <Carousel
            showArrows={true}
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={4000}
            stopOnHover={true}
            swipeable={true}
            emulateTouch={true}
            dynamicHeight={false}
            className="custom-carousel"
          >
            {images.map((id) => (
              <div key={id} className="carousel-slide">
                <div className="carousel-image-wrapper">
                  <Image
                    src={getImagePath(id)}
                    alt={`Showcase ${id}`}
                    width={1200}
                    height={800}
                    className="carousel-image"
                    priority={id === 1}
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <style jsx global>{`
        .showcase-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
          background: var(--color-background);
          min-height: 80vh;
          display: flex;
          align-items: center;
          position: relative;
        }

        .showcase-heading {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-3xl);
          color: #ffd700;
          font-family: var(--font-heading);
        }

        .carousel-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--content-padding);
        }

        .custom-carousel {
          width: 100%;
        }

        .custom-carousel .carousel {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 8px 30px rgba(0, 0, 0, 0.4),
            0 0 0 2px rgba(255, 255, 255, 0.1);
        }

        .carousel-slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* Custom arrow styling */
        .custom-carousel .control-arrow {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: none !important;
          border-radius: 0 !important;
          width: 50px !important;
          height: 50px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }

        .custom-carousel .control-arrow:hover {
          background: transparent !important;
          transform: translateY(-50%) scale(1.2) !important;
          opacity: 0.8 !important;
        }

        .custom-carousel .control-arrow:before {
          border-top: 10px solid transparent !important;
          border-bottom: 10px solid transparent !important;
          border-left: 16px solid #ffd700 !important;
          border-right: 16px solid #ffd700 !important;
          margin: auto !important;
          filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3)) !important;
        }

        .custom-carousel .control-prev.control-arrow:before {
          border-left: none !important;
          border-right: 16px solid #ffd700 !important;
        }

        .custom-carousel .control-next.control-arrow:before {
          border-right: none !important;
          border-left: 16px solid #ffd700 !important;
        }

        /* Custom indicator styling */
        .custom-carousel .carousel .control-dots {
          margin: 2rem 0 0 0 !important;
          padding: 0 !important;
        }

        .custom-carousel .carousel .control-dots .dot {
          width: 0 !important;
          height: 0 !important;
          border-radius: 0 !important;
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          margin: 0 0.5rem !important;
          transition: all 0.3s ease !important;
          position: relative !important;
        }

        .custom-carousel .carousel .control-dots .dot:before {
          content: '' !important;
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 0 !important;
          height: 0 !important;
          border-top: 6px solid transparent !important;
          border-bottom: 6px solid transparent !important;
          border-left: 10px solid rgba(255, 215, 0, 0.3) !important;
          transition: all 0.3s ease !important;
        }

        .custom-carousel .carousel .control-dots .dot:hover:before {
          border-left-color: rgba(255, 215, 0, 0.7) !important;
          transform: translate(-50%, -50%) scale(1.2) !important;
        }

        .custom-carousel .carousel .control-dots .dot.selected:before {
          border-left-color: #ffd700 !important;
          border-left-width: 14px !important;
          border-top-width: 8px !important;
          border-bottom-width: 8px !important;
        }

        /* Desktop styles */
        @media (min-width: 769px) {
          .custom-carousel .carousel .slide {
            min-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .carousel-image-wrapper {
            min-height: 600px;
          }

          .carousel-image {
            max-width: 100%;
            max-height: 600px;
            width: auto;
            height: auto;
          }
        }

        /* Tablet styles */
        @media (max-width: 968px) {
          .custom-carousel .control-arrow {
            width: 40px !important;
            height: 40px !important;
          }

          .custom-carousel .control-arrow:before {
            border-top: 8px solid transparent !important;
            border-bottom: 8px solid transparent !important;
            border-left: 12px solid #ffd700 !important;
            border-right: 12px solid #ffd700 !important;
            filter: drop-shadow(0 2px 3px rgba(255, 215, 0, 0.3)) !important;
          }

          .custom-carousel .control-prev.control-arrow:before {
            border-right: 12px solid #ffd700 !important;
          }

          .custom-carousel .control-next.control-arrow:before {
            border-left: 12px solid #ffd700 !important;
          }

          .custom-carousel .carousel .slide {
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .carousel-image-wrapper {
            min-height: 500px;
          }

          .carousel-image {
            max-width: 100%;
            max-height: 500px;
            width: auto;
            height: auto;
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .showcase-section {
            padding: var(--spacing-3xl) 0;
            min-height: auto;
          }

          .showcase-heading {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-xl);
          }

          .custom-carousel .carousel {
            border-radius: 12px;
          }

          .custom-carousel .control-arrow {
            width: 32px !important;
            height: 32px !important;
          }

          .custom-carousel .control-arrow:before {
            border-top: 6px solid transparent !important;
            border-bottom: 6px solid transparent !important;
            border-left: 10px solid #ffd700 !important;
            border-right: 10px solid #ffd700 !important;
            filter: drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3)) !important;
          }

          .custom-carousel .control-prev.control-arrow:before {
            border-right: 10px solid #ffd700 !important;
          }

          .custom-carousel .control-next.control-arrow:before {
            border-left: 10px solid #ffd700 !important;
          }

          .custom-carousel .carousel .control-dots {
            margin: 1rem 0 0 0 !important;
          }

          .custom-carousel .carousel .control-dots .dot {
            margin: 0 0.3rem !important;
          }

          .custom-carousel .carousel .control-dots .dot:before {
            border-top: 4px solid transparent !important;
            border-bottom: 4px solid transparent !important;
            border-left: 6px solid rgba(255, 215, 0, 0.3) !important;
          }

          .custom-carousel .carousel .control-dots .dot.selected:before {
            border-left-width: 10px !important;
            border-top-width: 6px !important;
            border-bottom-width: 6px !important;
          }

          .custom-carousel .carousel .slide {
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .carousel-image-wrapper {
            min-height: 300px;
            width: 100%;
            padding: 0;
          }

          .carousel-image {
            max-width: 100%;
            max-height: 300px;
            width: auto;
            height: auto;
            object-fit: contain;
          }
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .showcase-section {
            padding: var(--spacing-3xl) 0;
          }

          .showcase-heading {
            font-size: 1.25rem;
            margin-bottom: var(--spacing-lg);
          }

          .custom-carousel .carousel {
            border-radius: 10px;
          }

          .custom-carousel .control-arrow {
            width: 28px !important;
            height: 28px !important;
          }

          .custom-carousel .control-arrow:before {
            border-top: 5px solid transparent !important;
            border-bottom: 5px solid transparent !important;
            border-left: 8px solid #ffd700 !important;
            border-right: 8px solid #ffd700 !important;
            filter: drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3)) !important;
          }

          .custom-carousel .control-prev.control-arrow:before {
            border-right: 8px solid #ffd700 !important;
          }

          .custom-carousel .control-next.control-arrow:before {
            border-left: 8px solid #ffd700 !important;
          }

          .custom-carousel .carousel .control-dots {
            margin: 0.75rem 0 0 0 !important;
          }

          .custom-carousel .carousel .control-dots .dot {
            margin: 0 0.25rem !important;
          }

          .custom-carousel .carousel .control-dots .dot:before {
            border-top: 3px solid transparent !important;
            border-bottom: 3px solid transparent !important;
            border-left: 5px solid rgba(255, 215, 0, 0.3) !important;
          }

          .custom-carousel .carousel .control-dots .dot.selected:before {
            border-left-width: 8px !important;
            border-top-width: 5px !important;
            border-bottom-width: 5px !important;
          }

          .custom-carousel .carousel .slide {
            min-height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .carousel-image-wrapper {
            min-height: 250px;
            width: 100%;
            padding: 0;
          }

          .carousel-image {
            max-width: 100%;
            max-height: 250px;
            width: auto;
            height: auto;
            object-fit: contain;
          }
        }
      `}</style>
    </section>
  );
}
