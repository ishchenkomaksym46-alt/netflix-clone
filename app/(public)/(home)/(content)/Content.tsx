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
        <section className="catalog-section" aria-labelledby="catalog-title">
            <div className="section-heading">
                <div>
                    <h2 id="catalog-title">Popular on Netflix</h2>
                    <p>Hand-picked stories for your next movie night</p>
                </div>
            </div>
            {loading && <p className="page-loading" role="status">Loading content...</p>}
            {error && <p className="page-error" role="alert">{error}</p>}
            <div className="movie-grid">
                {content.map((item, index) => (
                    <article className="movie-card" key={`${item.title}-${index}`}>
                        <div className="movie-poster" aria-hidden="true">
                            <span className="movie-poster-label">Netflix film</span>
                        </div>
                        <div className="movie-card__body">
                            <div className="movie-card__title-row">
                                <h3>{item.title}</h3>
                                <span className="movie-rating">{item.ageRating}</span>
                            </div>
                            <p className="movie-meta">
                                <span>{item.year}</span>
                                <span>Directed by {item.director}</span>
                            </p>
                            <p className="movie-description">{item.description}</p>
                            <button
                                className="movie-watch-button"
                                onClick={() => alert('Nah I don\'t have rights for it!')}
                            >
                                <span aria-hidden="true">▶</span>
                                Watch now
                            </button>
                        </div>
                    </article>
                ))}
                {!loading && !error && content.length === 0 && (
                    <p className="empty-state">No titles yet. Check back soon for something to watch.</p>
                )}
            </div>
        </section>
    )
}