import React from "react";
import Heading from "../../components/Headings/Heading";
import pic9 from "/images/pic8.jpg";
import pic3 from "/images/pic7.jpg";
import Meta from "../../components/Meta/Meta";
import { FaGraduationCap, FaUniversity, FaUsers, FaHandshake, FaChartLine, FaHeart } from "react-icons/fa";

const About = () => {
  const objectives = [
    {
      icon: <FaUsers />,
      text: "Provide a vibrant forum that promotes interaction and networking among alumni of the Institute",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaChartLine />,
      text: "Help alumni achieve their professional and societal goals",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaHandshake />,
      text: "Help alumni in their hour of need",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <FaUniversity />,
      text: "Contribute to the Institute's vision of being recognized among the world's leading institutions in academics, research, outreach, and innovation",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaHeart />,
      text: "Function on a charitable basis and run the Association on a 'no profit, no loss' basis",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <FaGraduationCap />,
      text: "Promote best practices in different areas of science, technology, humanities, and social sciences for the benefit of the society, especially disadvantaged sections",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <>
      <Meta name="About - NIT Srinagar" />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative">
          <Heading heading="About Us" />
          <div className="text-center -mt-4 mb-12">
            <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4 mt-8">
              Discover the legacy and vision of National Institute of Technology Srinagar
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-col justify-center gap-16 relative">
        {/* First Section */}
        <div className="lg:max-w-[85%] md:w-[90%] w-[94%] mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-pink-600/10 blur-3xl"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

            <div className="p-8 lg:p-12 flex flex-col-reverse lg:flex-row items-center gap-10">
              <div className="w-full lg:w-[60%] space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  National Institute of Technology Srinagar
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Has been declared as an <span className="text-purple-400 font-semibold">Institute of National Importance</span> and has been granted a fully Autonomous Status by MHRD, Government of India. The Institute has also been declared as a <span className="text-pink-400 font-semibold">Centre of Excellence</span> to impart high level education training, research and development in science, engineering technology and humanities.
                  </p>

                  <p className="text-gray-300 leading-relaxed text-lg">
                    It is imparting high quality education & values at <span className="text-blue-400">UG (B.Tech)</span>, <span className="text-green-400">PG (M.Tech)</span> & <span className="text-yellow-400">Ph.D.</span> programmes through its experienced faculty well versed in their respective field of engineering and technology with well equipped laboratories.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-[40%] relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img
                  src={pic9}
                  className="relative rounded-2xl w-full shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                  alt="About Image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Section - Departments */}
        <div className="lg:max-w-[85%] md:w-[90%] w-[94%] mx-auto relative">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-12 border border-gray-700/50 shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Academic Excellence & Departments
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Engineering Departments</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Architecture</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Civil Engineering</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Computer Science & Engineering</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Electrical Engineering</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Electronics & Communication</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Information Technology</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Mechanical Engineering</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <h4 className="text-xl font-semibold text-green-400 mb-3">Science & Humanities</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Physics</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Mathematics</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Humanities and Social Science</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 text-gray-300 text-lg">
              <p className="leading-relaxed">
                National Institute of Technology Srinagar aims at setting out very high education standards and holds long record of academic excellence. The pedagogical aspects have been formulated to suit not only the needs of the contemporary industrial requirements but also to develop human potential to its fullest extent in a range of professions.
              </p>
              <p className="leading-relaxed">
                Extra curricular activities are planned through games and sports, cultural programmes and NSS activities. Cultural activities provide a platform to know about the culture of various states and regions of the country and opportunity for national integration.
              </p>
              <p className="leading-relaxed bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-xl border border-yellow-500/20">
                Ever since its rechristening, NIT Srinagar has been on the fast track of development and has undergone numerous facelifts because of which <span className="text-yellow-400 font-semibold">placement records have witnessed unprecedented growth</span> and is touching new heights as the graph of placement is increasing remarkably.
              </p>
            </div>
          </div>
        </div>

        {/* Third Section - Key Objectives */}
        <div className="lg:max-w-[85%] md:w-[90%] w-[94%] mx-auto relative">
          <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-purple-500 via-pink-500 to-purple-500"></div>

            <div className="p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-[40%] relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img
                  src={pic3}
                  className="relative rounded-2xl w-full shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                  alt="Key Objectives Image"
                />
              </div>

              <div className="w-full lg:w-[60%]">
                <h3 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Key objectives of the central alumni association
                </h3>
                <div className="w-24 mb-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

                <div className="space-y-4">
                  {objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="group flex gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${objective.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {objective.icon}
                      </div>
                      <p className="text-gray-300 leading-relaxed">{objective.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default About;