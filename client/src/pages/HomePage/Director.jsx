import React from "react";

const Director = () => {
    return (
        <section className="relative max-w-5xl mx-auto p-10 lg:p-16 bg-gradient-to-tr from-gray-50 via-white to-gray-100 rounded-3xl shadow-lg overflow-hidden">
            {/* Decorative background gradient circles */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-400/20 blur-3xl animate-float"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 right-10 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl animate-float animation-delay-2000"
            />
            {/* Container */}
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
                {/* Image + circle frame */}
                <div className="flex justify-center md:justify-start">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sky-500 shadow-lg overflow-hidden bg-gradient-to-br from-sky-400 to-indigo-600">
                        <img
                            src="/images/PKJ_Desk_Photo.jpg"
                            alt="Director Prof. Binod Kumar Kanaujia"
                            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
                {/* Text Content */}
                <div className="md:col-span-3 space-y-4">
                    <h2 className="text-3xl font-extrabold text-sky-600 tracking-wide leading-tight">
                        From the Director’s Desk
                    </h2>
                    <h3 className="text-xl font-semibold text-gray-800">Prof. Binod Kumar Kanaujia</h3>
                    <h4 className="text-sky-500 font-medium text-lg mb-3">
                        Director, NIT Srinagar &amp; Dr. B R Ambedkar NIT Jalandhar
                    </h4>

                    {/* Quotation Style */}
                    <blockquote className="relative pl-12 text-gray-700 text-justify text-base md:text-lg leading-relaxed before:absolute before:left-0 before:top-0 before:text-6xl before:text-sky-100 before:font-serif before:-translate-y-3 before:-translate-x-3 before:pointer-events-none before:select-none before:content-['“']">
                        Prof. Kanaujia brings decades of scholarly expertise and leadership excellence.
                        Holding degrees from KNIT Sultanpur and IIT BHU Varanasi, he has led distinguished
                        faculties and institutes before taking charge as Director of NIT Srinagar.
                        His vision embodies academic brilliance paired with collaborative community growth,
                        propelling the institute into a new era of innovation.
                    </blockquote>

                    {/* Additional info */}
                    <p className="text-gray-600">
                        Prof. Kanaujia assumed directorship of Dr. B R Ambedkar NIT Jalandhar in 2022 and
                        subsequently took on additional charges at IIIT Una and NIT Srinagar as per the
                        Ministry of Education directives in 2024.
                    </p>
                </div>
            </div>

            {/* Floating animations */}
            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(8px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s !important;
        }
      `}</style>
        </section>
    );
};

export default Director;