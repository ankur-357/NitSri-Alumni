import { FaUser, FaUserGraduate, FaPen, FaBug } from "react-icons/fa";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { MdWork, MdFeedback, MdEngineering, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";

const SideNav = () => {
  const [show, setShow] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const links = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard className="text-xl" />,
      path: "/dashboard",
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/30"
    },
    {
      name: "Profile",
      icon: <FaUser className="text-xl" />,
      path: "/profile",
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-500/30"
    },
    {
      name: "Alumni Profile",
      icon: <FaUserGraduate className="text-xl" />,
      path: "/alumni-profile",
      gradient: "from-green-500 to-teal-500",
      shadowColor: "shadow-green-500/30"
    },
    {
      name: "Share Experience",
      icon: <GiGiftOfKnowledge className="text-xl" />,
      path: "/share-experience",
      gradient: "from-yellow-500 to-orange-500",
      shadowColor: "shadow-yellow-500/30"
    },
    {
      name: "Write a Blog",
      icon: <FaPen className="text-xl" />,
      path: "/write-a-blog",
      gradient: "from-indigo-500 to-purple-500",
      shadowColor: "shadow-indigo-500/30"
    },
    {
      name: "Post a Job",
      icon: <MdWork className="text-xl" />,
      path: "/post-a-job?tab=prev-posts",
      gradient: "from-red-500 to-pink-500",
      shadowColor: "shadow-red-500/30"
    },
    {
      name: "Post an Internship",
      icon: <MdEngineering className="text-xl" />,
      path: "/post-an-internship",
      gradient: "from-teal-500 to-green-500",
      shadowColor: "shadow-teal-500/30"
    },
    {
      name: "Give Testimonial",
      icon: <MdFeedback className="text-xl" />,
      path: "/give-testimonial",
      gradient: "from-orange-500 to-red-500",
      shadowColor: "shadow-orange-500/30"
    },
    {
      name: "Report a Bug",
      icon: <FaBug className="text-xl" />,
      path: "/report-bug",
      gradient: "from-gray-600 to-gray-800",
      shadowColor: "shadow-gray-600/30"
    },
    {
      name: "Share Feedback",
      icon: <MdFeedback className="text-xl" />,
      path: "/share-feedback",
      gradient: "from-pink-500 to-purple-500",
      shadowColor: "shadow-pink-500/30"
    }
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (show && !event.target.closest('.sidebar-container')) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  return (
    <>
      {/* Backdrop for mobile */}
      {show && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 lg:hidden md:hidden"
          onClick={() => setShow(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-container bg-gray-900/95 backdrop-blur-xl border-r z-20 lg:sticky md:relative transition-all duration-300 ease-in-out top-0 fixed border-gray-800/50 px-4 py-8 lg:flex md:flex flex-col gap-2 items-start w-[17rem] h-full ${show ? "translate-x-0 shadow-2xl" : "lg:left-0 md:left-0 lg:translate-x-0 md:translate-x-0 -translate-x-full"
          }`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setShow(!show)}
          className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 absolute lg:hidden md:hidden top-[9rem] ${show ? "animate-none" : "animate-pulse"
            } -right-12 px-3 py-3 rounded-r-xl shadow-lg border-y border-r border-gray-700/50 transition-all duration-300 hover:shadow-xl`}
        >
          {show ? (
            <IoIosArrowBack className="text-white text-xl" />
          ) : (
            <IoIosArrowForward className="text-white text-xl" />
          )}
        </button>

        {/* Header */}
        <div className="relative w-full mb-6 mt-16 lg:mt-0 md:mt-0">
          <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-2xl p-5 backdrop-blur-sm border border-gray-800/50">
            <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Welcome User!
            </h2>
            <p className="text-gray-400 text-sm mt-1">Navigate your dashboard</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col w-full gap-2 relative">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full relative group"
            >
              {({ isActive }) => (
                <div
                  onClick={() => setShow(false)}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isActive
                    ? `bg-gradient-to-r ${link.gradient} shadow-lg ${link.shadowColor}`
                    : "hover:bg-gray-800/50"
                    }`}
                >
                  {/* Hover effect background */}
                  {!isActive && hoveredIndex === index && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-10 transition-opacity duration-300`}
                    />
                  )}

                  {/* Button content */}
                  <button className={`relative w-full flex items-center gap-4 font-medium text-start px-4 py-3.5 transition-all duration-300 ${isActive
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                    }`}>
                    {/* Icon container */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${isActive
                      ? "bg-white/20 shadow-lg"
                      : hoveredIndex === index
                        ? `bg-gradient-to-r ${link.gradient} text-white shadow-md`
                        : "bg-gray-800/50"
                      }`}>
                      {link.icon}
                    </div>

                    {/* Link name */}
                    <span className={`flex-1 transition-all duration-300 ${hoveredIndex === index && !isActive ? "translate-x-1" : ""
                      }`}>
                      {link.name}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full shadow-lg" />
                    )}
                  </button>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer decoration */}
        <div className="mt-auto pt-6 w-full">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <p className="text-center text-gray-500 text-xs mt-4">Alumni NITSGR © 2024</p>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
};

export default SideNav;