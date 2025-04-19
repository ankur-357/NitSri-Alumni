import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { HiMenuAlt3 } from 'react-icons/hi';

const NavBar = () => {
    const { user } = useAuth();
    const [menu, setMenu] = useState(false);

    const navLinks = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "About NITSGR",
            children: [
                {
                    name: "About NITSGR",
                    link: "/about",
                },
                {
                    name: "History",
                    link: "/history",
                },
                {
                    name: "Notable Alumni",
                    link: "/notableAlumni",
                },
                {
                    name: "Gallery",
                    link: "/gallery",
                }
            ]
        },
        {
            name: "Alumni Database",
            children: [
                {
                    name: "UG",
                    link: "/alumni-database?role=ug",
                },
                {
                    name: "PG",
                    link: "/alumni-database?role=pg",
                },
                {
                    name: "Ph.D",
                    link: "/alumni-database?role=phd",
                },
                {
                    name: "Faculty/Staff",
                    link: "/alumni-database?role=faculty-staff",
                },
            ]
        },
        {
            name: "Alumni Speaks",
            children: [
                {
                    name: "Blogs",
                    link: "/blogs",
                },
                {
                    name: "Experience",
                    link: "/experiences",
                },
                {
                    name: "Jobs",
                    link: "/jobs",
                },
                {
                    name: "Internship",
                    link: "/internships",
                },
            ]
        },
        {
            name: "Alumni Meets",
            children: [
                {
                    name: "Alumni Meet",
                    link: "/alumni-meet",
                },
                {
                    name: "Previous Meets",
                    link: "/prev-alumni-meets",
                },
            ]
        },
        {
            name: "JobFit Insight",
            link: "/jobfit-insight",

        },
        {
            name: "GIVING BACK",
            children: [
                {
                    name: "Giving Matters?",
                    link: "/why-giving-matters"
                },
                {
                    name: "Donate Now",
                    link: "/donate-now"
                }
            ]
        },

        {
            name: "Chatroom",
            link: "/chatroom"
        },
        {
            name: "Dashboard",
            link: "/dashboard",
        }
    ];

    return (
        <section className='h-16 text-black font-medium w-full flex gap-4 justify-between px-6 bg-[#192f59] items-center sticky top-0 z-50 shadow-md border-b'>
            <div>
                <Link to="/">
                    <img
                        src="images/logo515.png"
                        alt="logo"
                        className="size-12 rounded-full"
                    />
                </Link>
            </div>
            <div>
                <nav className='hidden lg:block'>

                    <ul className='list-none flex gap-2 text-sm items-center'>
                        {
                            navLinks.map((item, index) => (
                                <li key={index}>
                                    {
                                        item.link ?
                                            <Link to={item.link}>
                                                <div className='border-b border-black px-3 py-2 rounded-full cursor-pointer hover:bg-[#4B164C] hover:text-white whitespace-nowrap'>
                                                    {item.name}
                                                </div>
                                            </Link> :
                                            <div className='relative border-b border-black hover:bg-[#4B164C] px-3 py-2 rounded-full cursor-pointer group hover:text-white'>
                                                <p>{item.name}</p>
                                                <ul className='absolute bg-[#192f59] top-full p-4 hidden group-hover:flex flex-col space-y-6 '>
                                                    {
                                                        item.children?.map((item, index) => (
                                                            <li key={index} >
                                                                <Link to={item.link} className='border-b border-black hover:bg-[#4B164C] hover:text-white px-3 py-2 rounded-full cursor-pointer w-full whitespace-nowrap'>
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>

                                    }
                                </li>
                            ))
                        }
                    </ul>

                </nav>


            </div>
            <div className='text-sm flex gap-2'>
                {
                    user ? <Link to="/profile">
                        <img
                            title="profile"
                            src={`https://cloud.appwrite.io/v1/avatars/initials?name=${user.name.split(" ").join("+")}&width=80&height=80`}
                            alt="profile"
                            className="h-11 w-11 hover:scale-105 transition-all rounded-full"
                        />
                    </Link> :
                        <Link to="/signin" className="bg-gradient-to-r from-blue-500 to-green-500 px-3 py-2 rounded-full cursor-pointer">
                            SignIn
                        </Link>
                }

                <button
                    type="button"
                    onClick={() => setMenu(!menu)}
                    className="lg:hidden border focus:ring-[2.5px] focus:outline-none font-medium rounded-full text-sm px-2.5 py-0.5 text-center items-center focus:ring-gray-400 bg-[#4B164C] border-gray-900 text-white hover:bg-gray-700 mr-2"
                    aria-label={menu ? "Close Menu" : "Open Menu"}
                >
                    <span className="button-gradient-span">
                        {!menu ? <HiMenuAlt3 /> : <FiX />}
                    </span>
                </button>
            </div>

            <div className={`fixed flex flex-col items-start overflow-auto text-base px-7 pt-40 pb-10 sm:pt-28 justify-center gap-2 inset-0 w-full h-full z-[100] shadow-md text-white bg-[#4B164C] transition-all ease-in-out delay-150 ${menu ? "translate-x-0" : "translate-x-[100%]"}`}>
                <button
                    type="button"
                    aria-label={menu ? "Close Menu" : "Open Menu"}
                    onClick={() => setMenu(!menu)}
                    className="animate-pulse top-3 right-6 border focus:ring-[2.5px] focus:outline-none font-medium rounded-lg text-lg px-2.5 py-2.5 mt-2 text-center items-center focus:ring-gray-400 bg-gray-800 border-gray-900 text-white hover:bg-gray-700 absolute"
                >
                    {!menu ? <HiMenuAlt3 /> : <FiX />}
                </button>
                {navLinks.map((link, index) => {
                    if (link.children) {
                        return (
                            <div key={index} className="flex flex-col sm:gap-0 gap-1">
                                <div className="text-sky-500">
                                    {link.name}
                                </div>
                                <div>
                                    {link.children.map((child, i) => (
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={child.link}
                                            className="dropdown-link text-base"
                                            key={i + "child"}
                                            onClick={() => setMenu(!menu)}
                                        >
                                            <p className="text-gray-400 text-sm sm:py-0 py-0.5 hover:text-blue-400">
                                                {child.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <Link
                                style={{ textDecoration: "none" }}
                                to={link.link}
                                className="dropdown-link mb-2"
                                key={index}
                                onClick={() => setMenu(!menu)}
                            >
                                <p className="text-sky-500 hover:text-blue-400 text-sm">
                                    {link.name}
                                </p>
                            </Link>
                        )
                    }
                })}
            </div>

        </section>
    )
}

export default NavBar