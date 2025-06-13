import React from 'react'
import Heading from '../../components/Headings/Heading'
import AlumniCard from './AlumniCard'
import Meta from '../../components/Meta/Meta'
import { Client, Databases, Storage } from 'appwrite'; // Import Storage
import { useState, useEffect } from 'react';

const NotableAlumni = () => {
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
    <div className='bg-transparent'>
      <Meta name="Notable Alumni" />
      <Heading heading="Notable Alumni" heading1="of NIT Srinagar"></Heading>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-5 px-6 lg:gap-6 gap-8 py-16'>
        {
          notableAlums.map((alum, i) => (
            <AlumniCard key={i} alum={alum} />
          ))
        }
      </div>
    </div>
  )
}

export default NotableAlumni