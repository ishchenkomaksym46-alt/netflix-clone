'use client'

import Content from "@/app/(public)/(home)/(content)/Content";

export default function HomePage() {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-copy">
                    <p className="eyebrow">Stories worth staying in for</p>
                    <h1>Watch something <span>amazing.</span></h1>
                    <h2>All your favorites, all in one place.</h2>
                    <p className="hero-description">
                        Discover your next favorite movie and settle in for a great night of entertainment.
                    </p>
                </div>
            </section>

            <Content />
        </div>
    )
}