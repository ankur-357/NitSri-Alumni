import React from 'react'
import { FaShare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getImageURL } from '../../services/files';
import { toast } from 'react-toastify';
import { API_URL } from '../../constant';

const BlogCard = ({ data, type }) => {
    
    return (
        <div className='max-w-sm w-full p-4 border-2 hover:border-gray-800 bg-black  border-gray-900 rounded-2xl mt-5'>
            <Link data-aos="fade-up" to={`/${type === "experience" ? "experience" : "blog"}/${data.$id}`}>
                <div className='flex items-center justify-center h-44 overflow-hidden bg-cover w-full rounded-lg border border-gray-900'>
                    {
                        data.imgUrl ? (
                            <img
                                loading='lazy'
                                className='w-full h-44 object-cover'
                                src={getImageURL(data.imgUrl)}
                                alt={data.$collectionId === 'experiences' ? data.title : data.name}
                            />
                        ) : (
                            <img
                                loading='lazy'
                                className='w-full h-44 object-cover'
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.$collectionId === 'experiences' ? data.title || 'Placeholder' : data.name || 'Placeholder')}&background=0D8ABC&color=fff&size=512`}
                                alt={`Placeholder for ${data.$collectionId === 'experiences' ? data.title || 'item' : data.name || 'item'}`}
                            />
                        )
                    }
                </div>


                <p className='text-gray-400 pt-2 pl-2'>{
                    data.tags.map((tag, id) => (
                        <span key={id} className='text-sm mr-1 text-blue-400'>#{tag}</span>
                    ))
                }</p>
                <h3 className='text-xl font-semibold pl-2'>{data.title}</h3>
            </Link>

            <div className='bg-[#1F2937] rounded-lg p-3 flex justify-between mt-4'>
                <div>
                    <p className='text-white text-sm'>Date</p>
                    <p className='text-medium'>{new Intl.DateTimeFormat('en-AU').format(new Date(data.$createdAt))}</p>
                </div>


                <button
                    type="button"
                    className="text-lg font-medium text-white hover:scale-105 mt-3 self-end"
                    onClick={() => {
                        const shareItem = {
                            title: "Check out this blog by NITSGR Alumni.",
                            text: data.title + " by " + data.name,
                            url: `${API_URL}/${type === "experience" ? "experience" : "blog"}/${data.$id}`,
                        }

                        if (navigator.share) {
                            navigator.share(shareItem)
                                .catch((error) => {
                                    console.error('Error sharing')
                                });
                        } else {
                            toast.error("Your browser does not support Web Share API");
                        }
                    }}
                >
                    Share <FaShare className='inline-block ml-2' />
                </button>
            </div>
        </div>
    )
}

export default BlogCard