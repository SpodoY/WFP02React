import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Voting from './routes/Voting'
import Result  from './routes/Results'
import Landing  from './routes/Landing'
import ErrorPage from './Error-Page'

/*
    VITE_HARDHAT_CONTRACT_ADDRESS
    VITE_ARBITRUM_CONTRACT_ADDRESS
    VITE_SEPOLIA_CONTRACT_ADDRESS
    VITE_OPTIMISM_CONTRACT_ADDRESS
    */
//TODO: CHANGE CONTRACT ADDRESS TO Global Var. so it works for all sub-pages
const contractAddress = import.meta.env.VITE_HARDHAT_CONTRACT_ADDRESS

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        errorElement: <ErrorPage />
    },
    {
        path: "/results",
        element: <Result contract_address={contractAddress} />
    },
    {
        path: "/vote",
        element: <Voting contract_address={contractAddress}/>
    },
])

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)