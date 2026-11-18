'use client'

import {ContentProps} from "@/app/(public)/(home)/(content)/(types)/types";
import {useEffect, useState} from "react";
import {api} from "@/lib/api";

export default function Content() {
    const [content, setContent] = useState<ContentProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchContent = async () => {
            setError('');
            setLoading(true);

            try {
                const response = await api.get('/content/get');

                if(!response || response.status !== 200) {
                    console.error('Error fetching content:', response);
                    setError('An error occurred while fetching content.');
                } else {
                    setContent(response.data.content);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
                setError('An error occurred while fetching content.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return (
        <div>
            <h1><b>Movies</b></h1>
            {loading && <p>Loading content...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {content.map((item, index) => (
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <p>Director: {item.director}</p>
                        <p>Year: {item.year}</p>
                        <p>Description: {item.description}</p>
                        <p>Age Rating: {item.ageRating}</p>
                        <button onClick={() => alert('Nah I don\'t have rights for it!')}>Watch Now</button>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}