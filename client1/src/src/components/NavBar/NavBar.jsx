import { Link } from "react-router-dom";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
    const { user } = useAuth();
    const [menu, setMenu] = useState(false);

    const navLinks = [
        { name: "Home", path: "/admin" },
        { name: "Blogs", path: "/admin/blogs" },
        { name: "Experiences", path: "/admin/experiences" },
        { name: "Jobs", path: "/admin/jobs" },
        { name: "Internships", path: "/admin/internships" },
        { name: "Alumni", path: "/admin/alumnis" },
        { name: "Testimonials", path: "/admin/testimonials" },
        { name: "Events", path: "/admin/events" },
        { name: "Notable Alumni", path: "/admin/notable-alumni" },
        { name: "Gallery", path: "/admin/gallery" },
    ];

    return (
        <section className="h-16 text-black font-medium w-full flex gap-4 justify-between px-6 bg-[#192f59] items-center sticky top-0 z-50 shadow-md border-b">
            <div>
                <Link to="/" target="_blank">
                    <img
                        src="images/logo515.png"
                        alt="logo"
                        className="size-12 rounded-full"
                    />
                </Link>
            </div>

            <nav className="hidden lg:block">
                <ul className="list-none flex gap-2 text-sm items-center">
                    {navLinks.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>
                                <div className="border-b border-black px-3 py-2 rounded-full cursor-pointer hover:bg-[#4B164C] hover:text-white whitespace-nowrap">
                                    {item.name}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="text-sm flex gap-2">
                {user ? (
                    <Link to="/admin/profile">
                        <img
                            title="profile"
                            src={`https://cloud.appwrite.io/v1/avatars/initials?name=${user.name.split(" ").join("+")}&width=80&height=80`}
                            alt="profile"
                            className="h-11 w-11 hover:scale-105 transition-all rounded-full"
                        />
                    </Link>
                ) : (
                    <Link to="/signin" className="bg-gradient-to-r from-blue-500 to-green-500 px-3 py-2 rounded-full cursor-pointer">
                        SignIn
                    </Link>
                )}

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

                {navLinks.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        onClick={() => setMenu(false)}
                        className="dropdown-link mb-2"
                    >
                        <p className="text-sky-500 hover:text-blue-400 text-sm">
                            {item.name}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default NavBar;
