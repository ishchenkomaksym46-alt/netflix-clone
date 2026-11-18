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
        <section className="admin-page">
            <p className="eyebrow">Expand the collection</p>
            <h1>Add a movie</h1>
            <p className="admin-intro">Add the details below to bring a new title to the catalog.</p>
            <hr />

            <form className="admin-form" onSubmit={onSubmit}>
                <label>Movie title
                    <input type="text" placeholder="Enter the title" onChange={(e) => setTitle(e.target.value)} required/>
                </label>
                <label>Director
                    <input type="text" placeholder="Enter the director's name" onChange={(e) => setDirector(e.target.value)} required/>
                </label>
                <label>Release year
                    <input type="number" min={2000} placeholder="e.g. 2024" onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : '')} required/>
                </label>
                <label>Description
                    <textarea placeholder="A short description of the movie" onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>Age rating
                    <input type="text" placeholder="e.g. PG-13" onChange={(e) => setAgeRating(e.target.value)} required/>
                </label>
                <button className="form-submit" type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Movie'}
                </button>
                {error && <p className="page-error" role="alert">{error}</p>}
            </form>
        </section>
    )
}