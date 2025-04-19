import Heading from "../../components/Headings/Heading";
import { FaShare } from "react-icons/fa"; // Only keeping the share icon since delete is not needed
import Meta from "../../components/Meta/Meta";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../../services/documents"; // Your service for fetching documents
import { Client, Databases, Storage } from 'appwrite';
import { useState } from "react";
import { getImageURL } from "../../services/files"; // Service to handle image URL
import Loader from '../../components/Loader'

const Meet = () => {
  const [page, setPage] = useState(1); // Pagination state
  const currentDate = new Date();

  // Fetch alumni meets from Appwrite
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["events", page],
    queryFn: () => getDocuments("events", 4, 4 * (page - 1)), // Pagination logic (4 events per page)
    staleTime: 1000 * 60 * 3,
  });

  // Split events into upcoming and past
  const upcomingEvents = data?.filter(event => new Date(event.date) >= currentDate);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading alumni meets.</div>;
  }

  return (
    <div className="mt-100">
      <Meta name="Previous Alumni Meets" />
      <Heading heading="Upcoming Alumni" heading1="Meets of NIT Srinagar" />
      <br />

      {/* Alumni Meets Section */}
      {isLoading ? <div className="mt-100"><Loader /></div> :
        isError ? <p className='text-center py-16'>Error</p> :
          upcomingEvents?.length === 0 ? <p className='text-center py-16'>No Upcoming Events</p> :
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-10 md:px-5 px-5 lg:py-10 py-5'>
              {upcomingEvents?.map((item, index) => (
                <EventCard refetch={refetch} key={index} item={item} />
              ))}
            </div>
      }
    </div>
  );
};

export default Meet;

const EventCard = ({ item, refetch }) => {
  return (
    <div className='w-[25rem] h-fit flex flex-col justify-center p-2 mt-5 sm:p-4 border-2 hover:border-gray-800 bg-black border-gray-900 rounded-2xl'>
      <div className='flex justify-center'>
        <div className='flex bg-green-100 w-[22rem] items-center justify-center overflow-hidden rounded-lg border border-gray-900'>
          <img className='w-[22rem]' src={getImageURL(item.image)} alt="Event" /> {/* Ensure getImageURL is correctly fetching the URL */}
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-[22rem]'>
          <div><h1 className='text-2xl'>{item.title}</h1></div>
          <div>
            <h5 className='text-gray-400 text-sm'>Organized by</h5>
            <h3 className='text-xl'>{item.organizer}</h3>
          </div>
          <div className='flex flex-col gap-2'>
            <div>
              <h3 className='text-gray-400 text-sm'>Venue</h3>
              <h3 className='text-xl'>{item.venue}</h3>
            </div>
            <div className='bg-gray-800 p-2 rounded-lg'>
              <h2 className='text-gray-400 text-sm'>Date</h2>
              <h2>{new Date(item.date).toLocaleDateString()}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
