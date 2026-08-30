'use client'

import {FormEvent, ReactHTMLElement, useState} from "react";
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
            const response = await api.post('/auth/signup', { username, email, password });
            if(response.status === 201) {
                router.push('/');
            }
        } catch (e: any) {
            setError(`An error occurred while signing up: ${e.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username: " value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       minLength={3}
                       maxLength={15}
                        required/>
                <input type="email" placeholder="Email: "
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                        required/>
                <input type="password" placeholder="Password: "
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       minLength={8}
                       required/>

                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}