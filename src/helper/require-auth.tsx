import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/store-hooks";

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
}
