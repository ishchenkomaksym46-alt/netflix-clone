'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import {api} from "@/lib/api";

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if(!email || !password) {
            return setError('Please fill in all fields');
        }

        try {
            const response = await api.post('/auth/login', { email, password }, { withCredentials: true });

            if(!response) {
                return setError('Server problem, try again later');
            }

            if(response.status === 201) {
                window.dispatchEvent(new CustomEvent<boolean>('auth-state-changed', { detail: true }));
                router.push('/');
            } else if(response.status === 400) {
                setError('Invalid email or password');
            } else {
                setError('Server problem, try again later');
            }
        } catch {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-page">
            <div className="auth-panel">
                <p className="eyebrow">Welcome back</p>
                <h1>Sign in</h1>
                <p className="auth-subtitle">Pick up where your next favorite story begins.</p>

                <form className="auth-form" onSubmit={onSubmit}>
                <input type="email" placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
                <input type="password" placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
                <button className="form-submit" type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                {loading && <p className="form-feedback status-muted">Checking your account...</p>}
                {error && <p className="form-feedback form-error" role="alert">{error}</p>}
                </form>
                <p className="auth-footnote">New to Netflix? <a href="/auth/signup">Create an account</a></p>
            </div>
        </section>
    )
}