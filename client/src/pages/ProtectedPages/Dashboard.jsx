import { PageHeading } from '../../components/Headings/Heading'
import Meta from '../../components/Meta/Meta'
import { FaArrowRight, FaUser, FaGraduationCap, FaBlog, FaLightbulb, FaBriefcase, FaSuitcase, FaComments, FaPlusCircle, FaPen, FaShareAlt, FaBug, FaBell, FaBellSlash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { regSw, subscribe, unSubscribe } from '../../helper';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const dashboardItems = [
    {
      name: 'Profile',
      desc: 'Your profile',
      link: '/profile',
      icon: FaUser,
      color: 'from-purple-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Alumni Profile',
      desc: 'Your Alumni Profile',
      link: '/alumni-profile',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-cyan-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Read Blogs',
      desc: 'Blogs',
      link: '/blogs',
      icon: FaBlog,
      color: 'from-green-500 to-teal-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Read Experiences',
      desc: 'Experiences',
      link: '/experiences',
      icon: FaLightbulb,
      color: 'from-yellow-500 to-orange-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Explore Internships',
      desc: 'Internships',
      link: '/internships',
      icon: FaBriefcase,
      color: 'from-indigo-500 to-purple-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Explore Jobs',
      desc: 'Jobs',
      link: '/jobs',
      icon: FaSuitcase,
      color: 'from-red-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Give Testimonial',
      desc: 'Give Testimonial',
      link: '/give-testimonial',
      icon: FaComments,
      color: 'from-purple-600 to-blue-600',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Post Job Opening',
      desc: 'Jobs',
      link: '/post-a-job?tab=create-job',
      icon: FaPlusCircle,
      color: 'from-teal-500 to-green-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Post Intern Opening',
      desc: 'Internships',
      link: '/post-an-internship?tab=post-internship',
      icon: FaPlusCircle,
      color: 'from-orange-500 to-red-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Write a Blog',
      desc: 'Blogs',
      link: '/write-a-blog?tab=new-post',
      icon: FaPen,
      color: 'from-cyan-500 to-blue-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Share Experience',
      desc: 'Experiences',
      link: '/share-experience?tab=new-posts',
      icon: FaShareAlt,
      color: 'from-pink-500 to-purple-500',
      bgPattern: 'bg-gradient-to-br'
    },
    {
      name: 'Report Bugs',
      desc: 'Report problems',
      link: '/report-bug',
      icon: FaBug,
      color: 'from-gray-600 to-gray-800',
      bgPattern: 'bg-gradient-to-br'
    }
  ]

  const { user } = useAuth();

  const checkSubscription = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const subscription = await navigator.serviceWorker.ready.then((registration) => registration.pushManager.getSubscription());
        setIsSubscribed(subscription !== null);
      } catch (error) {
        setIsSubscribed(false);
      }
    } else {
      setIsSubscribed(false);
    }
  }

  useEffect(() => {
    checkSubscription();
  }, [])

  async function registerAndSubscribe() {
    setLoading(true);
    try {
      const serviceWorkerReg = await regSw();
      await subscribe(serviceWorkerReg, user.$id);
      toast.success('Subscribed to notifications');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function unSubscribeAndUnRegister() {
    setLoading(true);
    try {
      const serviceWorkerReg = await regSw();
      await unSubscribe(serviceWorkerReg);
      toast.success('Unsubscribed from notifications');
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='lg:px-9 px-4 relative'>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <Meta title="Dashboard | Alumni NITSGR" />
      <PageHeading heading='Alumni' heading1="Dashboard" />

      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-pink-600/10 rounded-2xl"></div>
        <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to Alumni NITSGR
            </h2>
            <p className="text-gray-400 mt-2">Manage your alumni activities from one place</p>
          </div>

          <button
            disabled={loading}
            onClick={async () => {
              if (isSubscribed) {
                const res = window.confirm('Are you sure you want to unsubscribe?');
                if (res) {
                  await unSubscribeAndUnRegister();
                  setIsSubscribed(false);
                }
              } else {
                await registerAndSubscribe();
                setIsSubscribed(true);
              }
            }}
            className={`
              relative group px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${isSubscribed
                ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              }
              disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
              text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
            `}
          >
            <span className="flex items-center gap-2">
              {isSubscribed ? <FaBellSlash /> : <FaBell />}
              {loading ? 'Processing...' : (isSubscribed ? 'Unsubscribe' : 'Subscribe')} to Notifications
            </span>
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {dashboardItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              to={item.link}
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 ${item.bgPattern} ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative p-6">
                {/* Icon with gradient background */}
                <div className={`inline-flex p-3 rounded-xl ${item.bgPattern} ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-2xl text-white" />
                </div>

                {/* Content */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${item.color} group-hover:bg-clip-text transition-all duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>

                  <FaArrowRight className="text-gray-600 group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300" />
                </div>

                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 h-1 ${item.bgPattern} ${item.color} w-0 group-hover:w-full transition-all duration-300`}></div>
              </div>
            </Link>
          );
        })}
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
    </div>
  )
}

export default Dashboard