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
        <div>
            <h1>Admin Page</h1>
            <p>Welcome to the admin page!</p>
            <hr/>

            <a href={Links.Users} className='cursor-pointer decoration-0 font-bold'>Manage Users</a>
            <a href={Links.AddMovies} className='cursor-pointer decoration-0 font-bold'>Add Movies</a>
            <a href={Links.AddSeries} className='cursor-pointer decoration-0 font-bold'>Add Series</a>
        </div>
    )
}