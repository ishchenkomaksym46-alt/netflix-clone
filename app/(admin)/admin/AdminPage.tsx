'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {api} from "@/lib/api";
import {Links} from "@/app/(admin)/(enums)/enums";

export default function AdminPage() {
    const router = useRouter();

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

    return (
        <section className="admin-page">
            <p className="eyebrow">Control room</p>
            <h1>Admin dashboard</h1>
            <p className="admin-intro">Manage your catalog and keep your community in good shape.</p>
            <hr/>

            <div className="admin-actions">
                <a href={Links.Users} className="admin-action-card">
                    <strong>Manage users</strong>
                    <span>Review members and moderate accounts →</span>
                </a>
                <a href={Links.AddMovies} className="admin-action-card">
                    <strong>Add a movie</strong>
                    <span>Grow the catalog with a new title →</span>
                </a>
            </div>
        </section>
    )
}