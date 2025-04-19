import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const PrivateRoute = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !user.emailVerification) {
            navigate("/admin/verify-email");
        }

        if (user && user.emailVerification && !user.labels.includes("admin")) {
            navigate("/admin/not-admin");
        }

    }, []);

    return (
        <div>
            {user ? <Outlet /> : <Navigate to="/admin/signin" />}
        </div>
    )
}

export default PrivateRoute;