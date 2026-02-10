import { useAppSelector } from './store-hooks';

export default function useToken() {
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const refreshToken = useAppSelector((state) => state.user.refreshToken);

    return {
        accessToken,
        refreshToken,
    };
}
