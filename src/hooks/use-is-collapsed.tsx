import { useState, useEffect } from 'react';

export default function useIsCollapsed() {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const stored = localStorage.getItem('sidebar-collapsed');
        return stored === 'true';
    });

    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', String(isCollapsed));
    }, [isCollapsed]);

    return {
        isCollapsed,
        setIsCollapsed,
        toggle: () => setIsCollapsed((prev) => !prev),
    };
}
