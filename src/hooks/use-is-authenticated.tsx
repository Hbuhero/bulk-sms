import { useAppSelector } from './store-hooks';

export default function useIsAuthenticated() {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const user = useAppSelector((state) => state.user.user);

    return {
        isAuthenticated,
        user,
    };
}
