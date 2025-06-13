import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import MalePlaceholder from "../../assets/man-placeholder.jpg";
import Meta from "../../components/Meta/Meta";
import { branches } from "../../utils/branches";
import { getAlumniData } from "../../services/documents";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import { MdError, MdBusiness, MdWork } from "react-icons/md";
import { HiOutlineAcademicCap, HiOutlineUserGroup } from "react-icons/hi";
import { BsCalendar3 } from "react-icons/bs";
import { getImageURL } from "../../services/files";
import AlumniCard from "./AlumniCard";

const AlumniDatabase = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        role: null,
        page: 1,
        type: "name",
        search: "",
    });
    const role = searchParams.get("role") || null;
    const page = parseInt(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || "";
    const type = searchParams.get('type') || "jobTitle";
    const [itemsPerPage] = useState(21);
    const [branch, setBranch] = useState(null);
    const [currentPopup, setCurrentPopup] = useState(null);
    const [searchText, setSearchText] = useState(search);
    const [searchType, setSearchType] = useState(type);

    const { isLoading, isError, data: alumni } = useQuery({
        queryKey: ["members", role, page, search, branch],
        queryFn: () => getAlumniData(itemsPerPage, (page - 1) * itemsPerPage, role, search, type, branch),
        staleTime: Infinity
    });

    const changeParams = (key, value) => {
        setSearchParams(prev => {
            prev.set(key, value);
            if (key === "search" || key === "type") prev.set("page", 1);
            return prev;
        }, { replace: true });
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            changeParams('search', searchText);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchText]);

    return (
        <div className="min-h-screen relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
            <Meta name="Alumni Database" />

            {/* Hero Section */}
            <div className="relative h-[65vh] min-h-[600px] overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-[url(https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/static-images%2F007d2522-8220-4d3d-b506-8fef870eb1df.jpg?alt=media&token=46a7d8e5-aa90-4461-bd2e-15df0204e7d5)] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/85 to-gray-950"></div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-12">
                    {/* Header */}
                    <div className="text-center mb-12 mt-20">
                        <div className="inline-flex items-center justify-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg shadow-sky-500/25">
                                <HiOutlineUserGroup className="text-3xl text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Alumni <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Database</span>
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Connect with <span className="text-sky-400 font-semibold">NITSGR Alumni</span> from around the world
                        </p>
                        {role && (
                            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-rose-500/30">
                                <span className="text-white font-medium">Viewing:</span>
                                <span className="text-rose-400 font-bold uppercase tracking-wide">{role}</span>
                            </div>
                        )}
                    </div>

                    {/* Search Section */}
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search Input */}
                                <div className="flex-1 relative group">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-sky-400 transition-colors duration-300" />
                                    <input
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        type="search"
                                        placeholder="Search alumni by name, company, designation..."
                                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-sky-500/50 focus:bg-gray-800/80 focus:shadow-lg focus:shadow-sky-500/10 transition-all duration-300"
                                    />
                                </div>

                                {/* Filter Dropdown */}
                                <div className="relative group">
                                    <select
                                        value={searchType}
                                        onChange={(e) => {
                                            setSearchType(e.target.value);
                                            changeParams('type', e.target.value);
                                        }}
                                        className="appearance-none bg-gray-800/50 border border-gray-700/50 rounded-xl px-6 py-4 pr-12 text-gray-300 font-medium focus:outline-none focus:border-sky-500/50 focus:bg-gray-800/80 transition-all duration-300 cursor-pointer hover:bg-gray-800/70"
                                    >
                                        <option value="">Search By</option>
                                        <option value="name">Name</option>
                                        <option value="batchEnd">Batch</option>
                                        <option value="company">Company</option>
                                        <option value="designation">Designation</option>
                                    </select>
                                    <FiFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Branch Filters */}
                    <div className="max-w-6xl mx-auto w-full mt-8">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => {
                                    setBranch(null);
                                    changeParams("page", 1);
                                }}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${branch === null
                                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                                    : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-800/70 hover:border-sky-500/50 hover:text-sky-400'
                                    }`}
                            >
                                All Branches
                            </button>
                            {branches.map((dept, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setBranch(dept.value);
                                        changeParams("page", 1);
                                    }}
                                    className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${branch === dept.value
                                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                                        : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-800/70 hover:border-sky-500/50 hover:text-sky-400'
                                        }`}
                                >
                                    {dept.value}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? <div className="pt-32 px-8 text-center text-base font-medium text-white">Loading...</div> :
                isError ? <div className="pt-24 px-8 text-center text-base font-medium text-white">
                    An error has occurred! Please try again later.
                </div> :

                    alumni && alumni.documents.length === 0 ?
                        <div className="pt-32 px-8 text-center text-base font-medium text-white">
                            No items.
                        </div>
                        :
                        <>
                            {currentPopup !== null && <AlumniCard person={alumni.documents[currentPopup]} close={() => setCurrentPopup(null)} />}
                            <div className="mt-24 lg:px-10 md:p-8 p-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                                {alumni.documents.map((person, idx) => {
                                    return (
                                        <div
                                            onClick={() => setCurrentPopup(idx)}
                                            data-aos="fade-up"
                                            key={idx}
                                            className="rounded-xl border hover:bg-[#101010] hover:border-gray-700 hover:border-l-sky-400  border-gray-900 cursor-pointer bg-[#000000] border-l-sky-500 border-l-4 shadow-lg w-full"
                                        >
                                            <div className="flex flex-row gap-5 hover:scale-95 transition p-4 py-6">
                                                <div className="lg:w-20 bg-cover flex items-center justify-center md:w-16 w-14 lg:h-20 md:h-16 h-14 rounded-full overflow-hidden">
                                                    <img
                                                        id={person.$id}
                                                        className="w-full object-cover lg:h-20 md:h-16 h-14"
                                                        src={person.image ? getImageURL(person.image) : MalePlaceholder}
                                                        alt={person.name}
                                                    />
                                                </div>

                                                <div className="text-sm font-medium flex-1">
                                                    <p className="text-xl font-bold text-sky-500">{person.title} {person.name}</p>
                                                    <p className="font-medium text-base text-gray-300">
                                                        {person.branch} ({person.degree})
                                                    </p>
                                                    {person.batchEnd && (
                                                        <p>
                                                            <span className="text-gray-400">Batch:</span>{" "}
                                                            {person.batchStart ? person.batchStart + "-" + person.batchEnd : person.batchEnd}
                                                        </p>
                                                    )}
                                                    {person.company && (
                                                        <p>
                                                            <span className="text-gray-400">Company:</span>{" "}
                                                            {person.company}
                                                        </p>
                                                    )}
                                                    {person.designation && (
                                                        <p>
                                                            <span className="text-gray-400">Designation:</span>{" "}
                                                            {person.designation}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <>
                                <div data-aos="fade-up" className="text-center px-3 pt-16">
                                    <p>Showing <span className="text-sky-500">{itemsPerPage * (page - 1) + 1}-{Math.min(
                                        itemsPerPage * page,
                                        alumni.total
                                    )}</span> results of <span className="text-sky-500">{alumni.total}</span></p>
                                </div>

                                <div data-aos="fade-up" className="flex items-center justify-center pt-5 gap-10 px-6">
                                    <button disabled={page <= 1} onClick={() => {
                                        changeParams('page', page - 1);
                                    }} className="px-8 py-2.5 rounded-xl bg-white disabled:bg-gray-400 text-gray-900 text-lg font-semibold">Prev</button>
                                    <button disabled={itemsPerPage > alumni.documents.length} onClick={() => {
                                        changeParams('page', page + 1);
                                    }} className="px-8 py-2.5 rounded-xl bg-white disabled:bg-gray-400 text-gray-900 text-lg font-semibold">Next</button>
                                </div>
                            </>
                        </>
            }
        </div>
    );
};

export default AlumniDatabase;
