import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Voting from './routes/Voting'
import Result  from './routes/Results'
import Landing  from './routes/Landing'
import ErrorPage from './Error-Page'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: '#EC6669',
            contrastText: '#F7D0D2'
        },
        secondary: {
            main: '#F7D0D2'
        }
    }
})

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)