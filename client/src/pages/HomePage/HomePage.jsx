
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
import React, { useEffect, useState } from 'react';


const RSSImageBoardWidget = () => {
  const [activeTab, setActiveTab] = useState("instagram");

  useEffect(() => {
    // Inject the widget script
    const script = document.createElement("script");
    script.src = "https://widget.rss.app/v1/carousel.js";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const tabs = [
    { id: "linkedin", label: "LinkedIn", widgetId: "CO1r6h8WJin6Uglk" },
    { id: "instagram", label: "Instagram", widgetId: "9pyptm731LLpELw5" },
    { id: "twitter", label: "Twitter", widgetId: "6gjYW8tPLVtqFGAE" },
    { id: "youtube", label: "YouTube", widgetId: "3pt16P4zaB8UvS05" },
  ];

  return (
    <div className=" mx-auto p-3 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">News Feed: Social Media</h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === tab.id
              ? "!bg-blue-600 !text-white"
              : "!bg-gray-200 !text-gray-700 hover:!bg-gray-300"
              }`}
          >

            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        {tabs.map((tab) =>
          activeTab === tab.id ? (
            <rssapp-carousel key={tab.id} id={tab.widgetId}></rssapp-carousel>
          ) : null
        )}
      </div>
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


      <div>
        <RSSImageBoardWidget />
      </div>


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
