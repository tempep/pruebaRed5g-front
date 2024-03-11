import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store"

export const PublicLayout = () => {
   

    const isAuthenticated = useAuthStore( state => state.isAuthenticated );

    if( !isAuthenticated ) {
        return (
            <>
                <Outlet />
            </>
        )
    } else {
        return <Navigate to={'/sufipay/disbursements'} replace />
    }
}
