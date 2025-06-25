import { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout1, Layout2, Layout3 } from "./utils/Layout";
import {
  Team,
  HomePage,
  Gallery,
  Events,
  NotableAlumni,
  AlumniCorner,
  About,
  Blog,
  Blogs,
  Error,
  AlumniDatabase,
  History,
  JobOffers,
  Job,
  GivingMatters,
  DonateNow,
  PreviousMeets,
  SignIn,
  SignUp,
  Verify,
  ForgotPassword,
  ResetPassword,
  Profile,
  AlumniProfile,
  GiveTestimonial,
  PostInernship,
  PostJob,
  ShareExperience,
  WriteBlog,
  Dashboard,
  ReportBug,
  Experiences,
  Experience,
  VerifyEmail,
  Internship,
  ShareFeedback,
  EditAlumniProfile,
  Meet,
  Internships,
  JobFit,
  Chatroom,
} from "./pages/index";
import ScrollToTop from "./hooks/useScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateComponent from "./components/PrivateComponent/PrivateComponent";
import AdminApp from "./src/adminApp"; // Ensure this is the correct import path
import GeminiChatbot from "./GeminiChatbot";
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const links = [
    { path: "/", element: <HomePage />, id: 1 },
    { path: "/gallery", element: <Gallery />, id: 2 },
    { path: "/team", element: <Team />, id: 3 },
    { path: "/history", element: <History />, id: 4 },
    { path: "/events", element: <Events />, id: 5 },
    { path: "/notablealumni", element: <NotableAlumni />, id: 6 },
    { path: "/verify-email", element: <VerifyEmail />, id: 7 },
    { path: "/job/:jobId", element: <Job />, id: 8 },
    { path: "/internship/:internshipId", element: <Internship />, id: 9 },
    { path: "/blogs", element: <Blogs />, id: 10 },
    { path: "/experiences", element: <Experiences />, id: 11 },
    { path: "/experience/:experienceId", element: <Experience />, id: 12 },
    { path: "/alumnicorner", element: <AlumniCorner />, id: 13 },
    { path: "/blog/:blogId", element: <Blog />, id: 14 },
    { path: "/about", element: <About />, id: 15 },
    { path: "/jobs", element: <JobOffers />, id: 16 },
    { path: "/alumni-database", element: <AlumniDatabase />, id: 17 },
    { path: "/alumni-meet", element: <Meet />, id: 18 },
    { path: "/internships", element: <Internships />, id: 19 },
    { path: "/prev-alumni-meets", element: <PreviousMeets />, id: 20 },
    { path: "/jobfit-insight", element: <JobFit />, id: 21 },
    { path: "/chatroom", element: <Chatroom />, id: 22 },
    { path: "/why-giving-matters", element: <GivingMatters />, id: 23 },
    { path: "/donate-now", element: <DonateNow />, id: 24 },
    { path: "*", element: <Error />, id: 25 },
  ];

  const adminProtectedRoutes = [
    { path: "/profile", component: <Profile />, id: 1 },
    { path: "/alumni-profile", component: <AlumniProfile />, id: 2 },
    { path: "/give-testimonial", component: <GiveTestimonial />, id: 3 },
    { path: "/post-an-internship", component: <PostInernship />, id: 4 },
    { path: "/post-a-job", component: <PostJob />, id: 5 },
    { path: "/share-experience", component: <ShareExperience />, id: 6 },
    { path: "/write-a-blog", component: <WriteBlog />, id: 7 },
    { path: "/dashboard", component: <Dashboard />, id: 8 },
    { path: "/report-bug", component: <ReportBug />, id: 9 },
    { path: "/share-feedback", component: <ShareFeedback />, id: 10 },
    { path: "/edit-alumni-profile", component: <EditAlumniProfile />, id: 11 },
  ];

  return (
    <div className="bg-[#192f59] text-black min-w-[365px] max-w-[100vw]">
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <>
          <ScrollToTop />
          {/* <ErrorBoundary> */}
          <AuthProvider>
            <Routes>
              {/* Main App Routes */}
              <Route path="/" element={<Layout1 />}>
                {links.map(({ path, element, id }) => (
                  <Route key={id} path={path} element={element} />
                ))}
              </Route>

              {/* Authentication Routes */}
              <Route path="/" element={<Layout3 />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Protected Routes */}
              <Route path="/" element={<Layout2 />}>
                {adminProtectedRoutes.map((route) => (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={<PrivateComponent />}
                  >
                    <Route
                      path={route.path}
                      element={route.component ? route.component : <Error />}
                    />
                  </Route>
                ))}
              </Route>
            </Routes>
          </AuthProvider>
          {/* </ErrorBoundary> */}
          <GeminiChatbot />
        </>
      </QueryClientProvider>
    </div>
  );
}

export default App;
