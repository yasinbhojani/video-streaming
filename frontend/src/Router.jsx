import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import VideoList from "./pages/VideoList/VideoList";
import Video from "./pages/Video/Video";
import ErrorElement from "./components/ErrorElement/ErrorElement";
import UploadVideo from "./pages/UploadVideo/UploadVideo";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorElement />,
      children: [
        {
          path: "",
          element: <VideoList />,
        },
        {
          path: "/video/:id",
          element: <Video />,
        },
        {
          path: "/upload",
          element: <UploadVideo />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
