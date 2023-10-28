import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)

    return ( 
        <>
        <div id="error-page"> 
            <h1> Oops! </h1>
            <p> An error has occured, the coding monkey will try to fix it ASAP </p>
            <p>
                <i> {error.statusText || error.message} </i>
            </p>
        </div>
        </>
     );
}
 
export default ErrorPage;