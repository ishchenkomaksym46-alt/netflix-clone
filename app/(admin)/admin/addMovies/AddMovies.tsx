'use client'

import {useEffect, useState} from "react";
import {api} from "@/lib/api";
import {useRouter} from "next/navigation";

export default function AddMoviesPage() {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [director, setDirector] = useState<string>('');
    const [year, setYear] = useState<number | ''>('');
    const [description, setDescription] = useState<string>('');
    const [ageRating, setAgeRating] = useState<string>('');

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await api.get('admin/check', { withCredentials: true });

                if(!response || response.status !== 200) {
                    console.error('Error checking authentication status:', response);
                    router.push('/');
                } else {
                    console.log('Admin check successful:', response.data);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                router.push('/');
            }
        }

        checkAuthStatus();
    }, [])

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (!title || !director || year === '' || !ageRating) {
            setError('All fields are required.');
            return
        }

        try {
            const response = await api.post('admin/add-movie', {
                title,
                director,
                year,
                description: description || "No description provided.",
                ageRating
            }, { withCredentials: true });

            if(!response) {
                setError('Error adding movie. No response from server');
            } else {
                console.log('Movie added successfully:', response.data);
                router.push('/admin');
            }
        } catch (e) {
            setError(`An error occurred while adding the movie: ${e instanceof Error ? e.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Add Movies</h1>
            <p>Here you can add new movies to the database.</p>
            <hr />

            <form onSubmit={onSubmit}>
                <p>Movie Title:</p>
                <input type="text" placeholder="Movie Title: " onChange={(e) => setTitle(e.target.value)} required/>
                <p>Director:</p>
                <input type="text" placeholder="Director: " onChange={(e) => setDirector(e.target.value)} required/>
                <p>Year:</p>
                <input type="number" placeholder="Year: " onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : '')} required/>
                <p>Description:</p>
                <input type="text" placeholder="Description: " onChange={(e) => setDescription(e.target.value)} />
                <p>Age Rating:</p>
                <input type="text" placeholder="Age Rating: " onChange={(e) => setAgeRating(e.target.value)} required/>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Movie'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}