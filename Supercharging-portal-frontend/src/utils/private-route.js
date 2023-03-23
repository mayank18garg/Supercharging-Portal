import React, { useState, useEffect} from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { PageLoader } from "../components/page-loader";

export const PrivateRoute = () => {

    const {isAuthenticated, getIdTokenClaims, loginWithRedirect, getAccessTokenSilently} = useAuth0();
    const [token, setToken] = useState(['']);
    // const [message, setMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getIdTokenClaims();
            // const { data, error } = await getAdminResource(accessToken);

            if (!isMounted) {
                return;
            }

            if (accessToken) {
                // setMessage(JSON.stringify(data, null, 2));
                setToken(accessToken['http://localhost:4040//roles']);
            }

            else{
                console.log("error");
                setToken(null);
            }
        };

        getMessage();

        return () => {
        isMounted = false;
        };
    }, [getAccessTokenSilently]);

    const Component = withAuthenticationRequired( {
        onRedirecting: () => (
          <div className="page-layout">
            <PageLoader />
          </div>
        ),
      });
    if(!isAuthenticated) return <Component />; 

    const allowedRoles = ['Admin'];
    const userRoles = ['User'];
    if(token?.find(role => allowedRoles.includes(role))){
        return <Outlet />;
    }
    else if(token?.find(role => userRoles.includes(role))){
        return <Navigate to="/notfound" />;
    }
    else{
        return null;
    }
    

}