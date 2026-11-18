'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import {api} from '@/lib/api'

export default function SignupForm() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        setError("");

        if(!username || !email || !password){
            setLoading(false);
            return setError('Please fill in all fields');
        } else if(username.length < 3) {
            setLoading(false);
            return setError('Please enter username that at least 3 characters long');
        } else if(username.length > 15) {
            setLoading(false);
            return setError('Please enter username that is no more than 15 characters long');
        } else if(password.length < 8) {
            setLoading(false);
            return setError('Please enter password that is at least 8 characters long');
        }

        try {
            const response = await api.post('/auth/signup', { username, email, password }, { withCredentials: true });
            if(response.status === 201) {
                window.dispatchEvent(new CustomEvent<boolean>('auth-state-changed', { detail: true }));
                router.push('/');
            }
        } catch (e) {
            setError(`An error occurred while signing up: ${e instanceof Error ? e.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="auth-page">
            <div className="auth-panel">
            <p className="eyebrow">Your next story starts here</p>
            <h1>Create account</h1>
            <p className="auth-subtitle">Join in and find something great to watch.</p>
            <form className="auth-form" onSubmit={onSubmit}>
                <input type="text" placeholder="Username" value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       minLength={3}
                       maxLength={15}
                       required/>
                <input type="email" placeholder="Email address"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                <input type="password" placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       minLength={8}
                       required/>

                {error && <p className="form-feedback form-error" role="alert">{error}</p>}
                {loading && <p className="form-feedback status-muted">Creating your account...</p>}

                <button className="form-submit" type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create account'}
                </button>
            </form>
            <p className="auth-footnote">Already have an account? <a href="/auth/login">Sign in</a></p>
            </div>
        </section>
    );
}