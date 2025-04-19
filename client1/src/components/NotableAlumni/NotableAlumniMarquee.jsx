import React, { useState, useEffect } from 'react';
import { RxArrowRight } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import AlumniCard from "../../pages/NotableAlumni/AlumniCard";
import { Client, Databases, Storage } from 'appwrite'; // Import Storage
import Loader from '../Loader';

const NotableAlumniMarquee = () => {
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
    const [notableAlums, setNotableAlums] = useState([]); // State to store alumni data

    // Initialize Appwrite client
    const client = new Client();
    const databases = new Databases(client);
    const storage = new Storage(client); // Initialize Storage properly

    useEffect(() => {
        client
            .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
            .setProject('66d70fbd0023cf963702'); // Your Appwrite project ID

        // Fetch the notable alumni data from Appwrite
        const fetchNotableAlums = async () => {
            try {
                const response = await databases.listDocuments('66d71087003555ba4896', 'notable-alumni');
                const alumniData = await Promise.all(
                    response.documents.map(async doc => {
                        // If the image is stored as a file in Appwrite, get the image URL
                        const imageURL = await getImageURL(doc.image); // Fetch image URL using file ID
                        console.log(imageURL);
                        return {
                            id: doc.$id,
                            name: doc.name,
                            designation: doc.designation,
                            about: doc.about,
                            image: imageURL, // Use the generated image URL
                        };
                    })
                );
                setNotableAlums(alumniData); // Update state with fetched data
            } catch (error) {
                console.error("Failed to fetch notable alumni:", error);
            }
        };

        fetchNotableAlums();

        // Event listener for screen resizing
        const handleResize = () => setScreenWidth(getScreenWidth());
        window.addEventListener("resize", handleResize);

        // Cleanup event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenWidth]);

    // Helper function to generate image URLs from Appwrite storage
    const getImageURL = async (fileId) => {
        if (!fileId) return ''; // If no file ID, return empty string
        try {
            const result = storage.getFileView('66d71060001f4955499c', fileId); // Replace 'YOUR_BUCKET_ID' with your Appwrite storage bucket ID
            return result.href; // Return the preview URL for the image
        } catch (error) {
            console.error("Failed to load image:", error);
            return ''; // Return empty string if there's an error
        }
    };

    function getScreenWidth() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width;
    }

    return (
        <div className="bg-white pt-16 pb-10">
            <div className='flex items-center justify-center text-center gap-3 flex-col'>
                <p data-aos="fade-up" className='lg:text-5xl text-4xl font-semibold pb-10'>Our Notable <span className='text-sky-500'>Alumni</span></p>

                {notableAlums.length > 0 ? (
                    <Marquee speed={70} autoFill={true} className="mb-5" pauseOnHover={screenWidth > 768 ? true : false}>
                        {notableAlums.map((alum, i) => (
                            <div key={i} className="lg:max-w-lg max-w-md px-5">
                                <AlumniCard key={i} alum={alum} />
                            </div>
                        ))}
                    </Marquee>
                ) : (
                    <Loader />
                )}

                <Link to="/notableAlumni" className="flex gap-1 py-3 mt-3 px-8 rounded-xl bg-[#4B164C] hover:bg-black hover:scale-105 transition focus:bg-gray-600 text-white font-medium">
                    <button>Explore</button>
                    <RxArrowRight size={24} />
                </Link>
            </div>
        </div>
    );
};

export default NotableAlumniMarquee;
