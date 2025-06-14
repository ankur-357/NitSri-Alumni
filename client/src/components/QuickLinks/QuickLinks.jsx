import { Link } from 'react-router-dom';
import { useState } from 'react';
import Heading1 from '../Headings/Heading1';

const QuickLinks = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const navigationItems = [
        { title: "Undergraduate Network", iconPath: "./images/quicklink/blockchain.png", route: "/alumni-database?role=ug" },
        { title: "Postgraduate Community", iconPath: "./images/quicklink/electrical.png", route: "/alumni-database?role=pg" },
        { title: "Doctoral Research Network", iconPath: "./images/quicklink/web.png", route: "/alumni-database?role=phd" },
        { title: "Reunion Events", iconPath: "./images/quicklink/social.png", route: "/alumni-meet" },
        { title: "Success Stories", iconPath: "./images/quicklink/content.png", route: "/blogs" },
        { title: "Experiences", iconPath: "./images/quicklink/marketing.png", route: "/experiences" },
        { title: "Internship Opportunities", iconPath: "./images/quicklink/design.png", route: "/internships" },
        { title: "Career Gateway", iconPath: "./images/quicklink/event.png", route: "/jobs" },
    ];

    return (
        <section className='relative py-28 bg-white'>
            <div className="relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block p-4 mb-6">
                        <Heading1 text1={"Navigation"} text2={"Hub"} />
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Explore our interconnected alumni ecosystem
                    </p>
                </div>

                <div className='max-w-7xl mx-auto px-6'>
                    <div className='grid lg:grid-cols-2 gap-8 items-start'>
                        {navigationItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.route}
                                className="block group"
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className={`
                                    relative p-6 rounded-3xl border border-gray-200 transition-transform duration-500
                                    bg-emerald-50 shadow-md hover:shadow-lg transform group-hover:scale-105
                                    ${activeIndex === index ? 'shadow-xl' : ''}
                                `}>
                                    <div className="flex items-center space-x-5">
                                        <div className="p-4 rounded-2xl bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                                            <img
                                                src={item.iconPath}
                                                alt={item.title}
                                                className='w-8 h-8 transition-transform duration-300'
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-xl font-bold text-gray-800 transition-all`}>
                                                {item.title}
                                            </h3>
                                            <div className="h-0.5 mt-2 bg-black w-0 group-hover:w-full transition-all duration-500"></div>
                                        </div>

                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 group-hover:bg-gray-500 transition-all">
                                            <svg className="w-5 h-5 text-black transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuickLinks;