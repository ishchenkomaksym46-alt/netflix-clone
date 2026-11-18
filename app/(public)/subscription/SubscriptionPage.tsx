'use client'

export default function SubscriptionPage() {
    return (
        <div>
            <h1>Subscription Page</h1>
            <p>This is the subscription page of the application.</p>

            <hr />

            <div>
                <h2>Subscription Plans</h2>
                <ul>
                    <li>Basic Plan - $9.99/month</li>
                    <button onClick={() => alert('Thanks! But it gives you nothing!')}>Subscribe</button>
                    <li>Standard Plan - $14.99/month</li>
                    <button onClick={() => alert('Thanks! But it gives you nothing!')}>Subscribe</button>
                    <li>Premium Plan - $19.99/month</li>
                    <button onClick={() => alert('Thanks! But it gives you nothing!')}>Subscribe</button>
                </ul>
            </div>
        </div>
    )
}