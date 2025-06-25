import React from "react";
import Heading from "../../components/Headings/Heading";
import Meta from "../../components/Meta/Meta";
import Timeline2 from "../../components/Timeline/Timeline2";

const History = () => {
  return (
    <>
      <Meta name="History" />
      <div>
        <Heading heading="History of NITSGR" />
      </div>

      <div className="flex sm:flex-row flex-col sm:w-full justify-center gap-10 p-6">
        <div className="sm:w-8/12 flex-col">
          <Timeline2 />

          <section className="bg-gray-900 rounded-xl">
            <div className="mx-auto max-w-screen-xl text-center lg:py-16 py-10 px-6">
              <div className="mx-auto max-w-screen-sm">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
                  Campus
                </h2>
                <p className="lg:text-lg text-gray-300 text-justify">
                  NIT Srinagar functions from a 40-acre (16 ha) campus located
                  in Hazratbal, Srinagar, on the picturesque banks of the
                  world-famous Dal Lake. Surrounded by the majestic Zabarwan
                  mountain range, the campus offers a tranquil and scenic
                  environment that inspires academic and personal growth. The
                  institute is situated adjacent to the revered Hazratbal
                  Shrine, a significant cultural and religious landmark in the
                  Kashmir Valley.
                </p>

                <p className="lg:text-lg mt-5 text-gray-300 text-justify">
                  Land for a new campus, a 125-acre (51 ha) plot, has been
                  assigned at Sikandarpur village in Srinagar, around 40 km from
                  the city. Earlier it was assigned at Dumri village in
                  Srinagar. Once NIT-Srinagar shifts to its new campus, it will
                  run some management courses on the present campus at Ashok
                  Rajpath.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default History;
