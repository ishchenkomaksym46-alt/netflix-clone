'use client'

export default function AboutPage() {
    return (
        <main className="about-page">
            <section className="about-hero">
                <p className="eyebrow">A little about us</p>
                <h1>Great stories.<br /><span>One place.</span></h1>
                <p>
                    We believe the best stories bring people together. This is your place to
                    discover movies, find a new favorite, and make movie night count.
                </p>
                <span className="about-wordmark" aria-hidden="true">N</span>
            </section>

            <section className="about-details">
                <article className="about-feature">
                    <span className="about-feature__number">01</span>
                    <h2>Find your next favorite</h2>
                    <p>Explore a growing collection of films and discover something worth watching.</p>
                </article>
                <article className="about-feature">
                    <span className="about-feature__number">02</span>
                    <h2>Made for movie nights</h2>
                    <p>From a quick pick to a full evening in, there is always room for a good story.</p>
                </article>
                <article className="about-feature">
                    <span className="about-feature__number">03</span>
                    <h2>More stories ahead</h2>
                    <p>We are building a home for entertainment that keeps getting better.</p>
                </article>
            </section>
        </main>
    )
}