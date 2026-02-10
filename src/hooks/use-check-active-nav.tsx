import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useCheckActiveNav() {
    const { pathname } = useLocation();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

    const checkActiveNav = useMemo(() => (nav: string) => {
        const pathArray = currentPath.split('/').filter((item) => item !== '');
        const navArray = nav.split('/').filter((item) => item !== '');

        return (
            (navArray.length > 0 && navArray[navArray.length - 1] === pathArray[pathArray.length - 1]) ||
            currentPath === nav
        );
    }, [currentPath]);

    return { checkActiveNav };
}
