import { useState, useEffect } from 'react';

export default function useAuthentication() {
    const key: string = "jwt";
    const [jwtToken, setJwtToken] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            try {
                return JSON.parse(storedValue);
            } catch {
                return { token: "" };
            }
        }
        return { token: "" };
    });

    useEffect(() => {
        if (jwtToken === undefined) return;
        localStorage.setItem(key, JSON.stringify(jwtToken));
    }, [jwtToken]);

    return [jwtToken, setJwtToken] as const;
}
