'use client'

import Link from "next/link";
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
        <header id="main-header">
            <Link className="brand" href="/" aria-label="Netflix home">
                <span className="brand-mark" aria-hidden="true" />
                <h1 id="header-title">NETFLIX</h1>
            </Link>

            <nav id="header-links" aria-label="Main navigation">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/subscription">Subscription</Link>
            </nav>

            <div className="header-actions">
                {!isLoggedIn ? (
                    <>
                        <Link className="header-action" href="/auth/login">Log in</Link>
                        <Link className="header-action header-action--primary" href="/auth/signup">Join now</Link>
                    </>
                ) : (
                    <button
                        className="header-action header-action--primary"
                        onClick={onLogoutClick}
                        disabled={loading}
                    >
                        Log out
                    </button>
                )}
            </div>

            {(loading || error) && (
                <div className="header-feedback" role={error ? "status" : undefined}>
                    {loading && <span className="status-muted">Checking session...</span>}
                    {error && <span className="status-error">{error}</span>}
                </div>
            )}
        </header>
    )
}