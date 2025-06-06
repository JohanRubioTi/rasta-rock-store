import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode >
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  </React.StrictMode>
);
