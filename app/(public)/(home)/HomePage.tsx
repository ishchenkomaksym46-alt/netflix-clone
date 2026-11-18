'use client'

import Content from "@/app/(public)/(home)/(content)/Content";

export default function HomePage() {
    return (
        <div id="home-main-div">
            <div id="home-div-title">
                <h1>Welcome To Netflix!</h1>
                <h3>All In One Cinema Platform</h3>

                <hr />

                <Content />
            </div>
        </div>
    )
}