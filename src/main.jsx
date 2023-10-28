import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Voting from './routes/Voting'
import Result  from './routes/Results'
import Landing  from './routes/Landing'
import Voting2 from './routes/Voting2'
import ErrorPage from './Error-Page'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        errorElement: <ErrorPage />
    },
    {
        path: "/results",
        element: <Result />
    },
    {
        path: "/vote",
        element: <Voting />
    },
    {
        path: "/vote2",
        element: <Voting2 />
    },
])

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)