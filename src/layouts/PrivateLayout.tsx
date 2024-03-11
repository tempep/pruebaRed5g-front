import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const PrivateLayout = () => {

  const isAuthenticated = useAuthStore( state => state.isAuthenticated );
  console.log(isAuthenticated);

  if( isAuthenticated ) {
    return (
      <>
        <Outlet />
      </>
    )
  } else {
    return <Navigate to={'/'} />
  }
  
}
