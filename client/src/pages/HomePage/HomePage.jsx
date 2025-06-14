
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
