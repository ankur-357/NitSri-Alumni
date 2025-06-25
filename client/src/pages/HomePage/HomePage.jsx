
import Events from "./Events";
import Blogs from "./Blogs";
import Testimonials from "./Testimonials";
import QuickLinks from "../../components/QuickLinks/QuickLinks";
import ImageSlider from "./ImageSlider";
import NotableAlumniMarquee from "../../components/NotableAlumni/NotableAlumniMarquee";
import Meta from "../../components/Meta/Meta";
import Welcome from "../../components/Welcome/Welcome";
import Gallery from "./Gallery";
import Faq from "../../components/Faqs/Faq";
import Director from "./Director";
import "./HomePage.css";
// Method 1: Using useEffect to load the external script
import React, { useEffect } from 'react';

const RSSCarouselWidget = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://widget.rss.app/v1/carousel.js';
    script.async = true;
    script.type = 'text/javascript';

    // Append to document head
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>RSS Feed Carousel</h2>
      <rssapp-carousel id="6gjYW8tPLVtqFGAE"></rssapp-carousel>
    </div>
  );
};

// Method 2: Using iframe (Recommended for React)
const RSSCarouselIframe = () => {
  return (
    <div>
      <h2>RSS Feed Carousel</h2>
      <iframe
        width="360"
        height="440"
        src="https://rss.app/embed/v1/carousel/6gjYW8tPLVtqFGAE"
        frameBorder="0"
        title="RSS Carousel Widget"
      />
    </div>
  );
};

// Method 3: Responsive iframe with custom styling
const ResponsiveRSSCarousel = () => {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h2>RSS Feed Carousel</h2>
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden'
      }}>
        <iframe
          src="https://rss.app/embed/v1/carousel/6gjYW8tPLVtqFGAE"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="RSS Carousel Widget"
        />
      </div>
    </div>
  );
};

// Method 4: Using dangerouslySetInnerHTML (Use with caution)
const RSSCarouselDangerousHTML = () => {
  const widgetHTML = `
    <rssapp-carousel id="6gjYW8tPLVtqFGAE"></rssapp-carousel>
    <script src="https://widget.rss.app/v1/carousel.js" type="text/javascript" async></script>
  `;

  return (
    <div>
      <h2>RSS Feed Carousel</h2>
      <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />
    </div>
  );
};

// Method 5: Custom hook for script loading
const useScript = (src) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);
};

const RSSCarouselWithHook = () => {
  useScript('https://widget.rss.app/v1/carousel.js');

  return (
    <div>
      <h2>RSS Feed Carousel</h2>
      <rssapp-carousel id="6gjYW8tPLVtqFGAE"></rssapp-carousel>
    </div>
  );
};

const HomePage = () => {

  return (
    <>
      <Meta name="Alumni Cell - NITSGR" />
      <Welcome />

      <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-1 gap-0 h-auto">
        <div className="col-span-1 lg:col-span-3 p-0 rounded-lg shadow-lg h-full w-full m-auto flex flex-col justify-center bg-blue ">
          <ImageSlider />
        </div>
        <div className="col-span-1 lg:col-span-2 text-white p-2 rounded-lg shadow-lg h-full w-full m-auto overflow-y-auto">
          <Director />
        </div>

      </div>
      {/* Director section starts here */}

      <RSSCarouselWidget />



      <QuickLinks />

      {/* Events Section */}

      <Events />

      <NotableAlumniMarquee />

      {/* Blogs section starts here */}
      <Blogs />

      {/* Testimonials section starts here */}
      <Testimonials />

      <Gallery />

      <Faq />
    </>
  );
};

export default HomePage;
