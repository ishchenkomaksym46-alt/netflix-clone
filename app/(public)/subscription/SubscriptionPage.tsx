'use client'

export default function SubscriptionPage() {
    return (
        <main className="plans-page">
            <section className="plans-heading">
                <p className="eyebrow">Pick your plan</p>
                <h1>Watch your way.</h1>
                <p>Choose the experience that fits your movie nights.</p>
            </section>

            <section className="plans-grid" aria-label="Subscription plans">
                <article className="plan-card">
                    <span className="plan-kicker">The essentials</span>
                    <h2>Basic</h2>
                    <p className="plan-price">$9.99<span> / month</span></p>
                    <p className="plan-description">A simple way to get started with your next favorite story.</p>
                    <ul>
                        <li>Unlimited movies and shows</li>
                        <li>Watch on one device</li>
                        <li>HD quality</li>
                    </ul>
                    <button className="plan-button" onClick={() => alert('Thanks! But it gives you nothing!')}>
                        Choose Basic
                    </button>
                </article>

                <article className="plan-card plan-card--featured">
                    <span className="plan-badge">Most popular</span>
                    <span className="plan-kicker">A little more to love</span>
                    <h2>Standard</h2>
                    <p className="plan-price">$14.99<span> / month</span></p>
                    <p className="plan-description">More flexibility for sharing the stories you love.</p>
                    <ul>
                        <li>Unlimited movies and shows</li>
                        <li>Watch on two devices</li>
                        <li>Full HD quality</li>
                    </ul>
                    <button className="plan-button" onClick={() => alert('Thanks! But it gives you nothing!')}>
                        Choose Standard
                    </button>
                </article>

                <article className="plan-card">
                    <span className="plan-kicker">The full experience</span>
                    <h2>Premium</h2>
                    <p className="plan-price">$19.99<span> / month</span></p>
                    <p className="plan-description">Bring everyone together for the ultimate movie night.</p>
                    <ul>
                        <li>Unlimited movies and shows</li>
                        <li>Watch on four devices</li>
                        <li>Ultra HD quality</li>
                    </ul>
                    <button className="plan-button" onClick={() => alert('Thanks! But it gives you nothing!')}>
                        Choose Premium
                    </button>
                </article>
            </section>
            <p className="plans-note">Plans shown for demonstration. Subscription checkout is not available yet.</p>
        </main>
    )
}