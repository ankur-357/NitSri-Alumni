import React from 'react'
import { FaShare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getImageURL } from '../../services/files';
import { toast } from 'react-toastify';

const TestimonialCard = ({ data }) => {
    console.log(data)
    return (
        <div data-aos="fade-up" className='flex' >
            <div className='border-[1px] border-gray-500 border-b-cyan-500 hover:border-b-cyan-600 border-b-8 rounded-2xl w-full p-3 pt-5 pb-7 hover:scale-[101%] z-0 hover:z-10 transition-all delay-[30ms] ease-in-out m-1 bg-[#205781] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] py-10'>
                <div className='rounded'>
                    <p className='px-2'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-sky-400 mb-6" height="38" width="38" xmlns="http://www.w3.org/2000/svg"><path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z">
                        </path>
                        </svg>
                    </p>
                    <p className='text-justify m-2 text-white '>{data.message}</p>
                </div>
                <div className='flex items-center lg:gap-5 md:gap-3 gap-2 mt-6 px-2'>
                    <div>
                        <h2 className='text-base font-medium'><span className='text-sky-500 font-semibold text-lg'>{data.name}</span> ({data.branch}-{data.batch})</h2>
                        <p className='text-gray-500 text-sm font-medium leading-5 mt-1'>
                            {data.currentCompany} ({data.currentPost})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestimonialCard