'use client'

import {useEffect, useState} from "react";
import {api} from "@/lib/api";
import {useRouter} from "next/navigation";

function hasResponseStatus(error: unknown, status: number): boolean {
    if (typeof error !== "object" || error === null || !("response" in error)) {
        return false;
    }

    const response = error.response;
    return typeof response === "object"
        && response !== null
        && "status" in response
        && response.status === status;
}

export default function Header() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true);
            setError('');

            try {
                await api.post('/auth/valid');
                setIsLoggedIn(true);

            } catch (validError) {
                if (!hasResponseStatus(validError, 401)) {
                    setError(`Could not check auth status: ${validError instanceof Error ? validError.message : 'Unknown error'}`);
                    return;
                }

                try {
                    await api.post('/auth/refresh');
                    setIsLoggedIn(true);
                } catch (refreshError) {
                    if (hasResponseStatus(refreshError, 401)) {
                        return;
                    }

                    setError(`Could not refresh session: ${refreshError instanceof Error ? refreshError.message : 'Unknown error'}`);
                }
            } finally {
                setLoading(false);
                router.refresh();
            }
        }

        checkAuthStatus();

        const handleAuthChange = (event: Event) => {
            setIsLoggedIn((event as CustomEvent<boolean>).detail);
        };

        window.addEventListener('auth-state-changed', handleAuthChange);
        return () => window.removeEventListener('auth-state-changed', handleAuthChange);
    }, [])

    const onLogoutClick = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/logout', {}, { withCredentials: true });

            if(!response) {
                return setError('Server error occurred, try again later');
            } else if(response.status !== 201) {
                return setError('Logout error occurred, try again later');
            }

            window.dispatchEvent(new CustomEvent<boolean>('auth-state-changed', { detail: false }));
            router.push('/auth/login');
        } catch (e) {
            return setError(`Could not logout: ${e instanceof Error ? e.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <header id={"main-header"}>
            <b><h1 id={"header-title"}>Netflix</h1></b>

            <div id={"header-links"}>
                <a href={"/"} className={"text-white hover:text-gray-300"}>Home</a>
                <a href={"/about"} className={"text-white hover:text-gray-300"}>About</a>
                <a href={"/subscription"} className={"text-white hover:text-gray-300"}>Subscription</a>

                {!isLoggedIn ? (
                    <>
                        <a href={"/auth/login"} className={"text-white hover:text-gray-300"}>Log in</a>
                        <a href={"/auth/signup"} className={"text-white hover:text-gray-300"}>Register</a>
                    </>
                ) : (
                    <button
                        className={"bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"}
                        onClick={onLogoutClick}
                    >
                        Log out
                    </button>
                )}
            </div>

            {loading && <p className={"text-white"}>Checking session...</p>}
            {error && <p className={"text-red-500"}>{error}</p>}
        </header>
    )
}