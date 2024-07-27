import React from 'react'
import ReactDOM from 'react-dom/client'
import AboutPage from './routes/aboutPage'
import MiscPage from './routes/miscPage'
import ProjectsPage from './routes/projectsPage'
import WritingsPage from './routes/writingsPage'
import './index.css'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <AboutPage></AboutPage>,
  },
  {
    path: "/about",
    element: <AboutPage></AboutPage>,
  },
  {
    path: "/writings",
    element: <WritingsPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/misc",
    element: <MiscPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
