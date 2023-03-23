import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, {ComponentType} from "react";
import { PageLoader } from "./page-loader";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Outlet, Location } from "react-router-dom";
export const AuthenticationGuard = ({ component }) => {
  // return ComponentType;
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};

// export const AuthenticationGuard = () => {
//   const {auth} = useAuth0();

//   return(
//     auth.user
//   )
// }