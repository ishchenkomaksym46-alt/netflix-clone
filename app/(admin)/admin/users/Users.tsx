'use client'

import {useEffect, useState} from "react";
import {UserDto} from "@/app/(admin)/(dto)/dto";
import {api} from "@/lib/api";
import {useRouter} from "next/navigation";

type UsersResponse = {
    status: number;
    users: UserDto[];
};

export default function UsersPage() {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
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

        const getUsers = async () => {
            setError('');
            setLoading(true);

            try {
                const response = await api.get<UsersResponse>('admin/users');

                if(!response || response.status !== 200) {
                    setError(`Error fetching users: ${response ? response.statusText : 'No response from server'}`);
                } else {
                    setUsers(response.data.users);
                }
            } catch (e) {
                setError(`An error occurred while fetching users: ${e instanceof Error ? e.message : 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        }

        getUsers();
    }, []);

    const onBanUser = async (userId: string) => {
        setError('');
        setLoading(true);

        try {
            const response = await api.delete(`admin/ban`, { data: { userId }, withCredentials: true });

            if (!response || response.status !== 200) {
                setError(`Error banning user: ${response ? response.statusText : 'No response from server'}`);
            } else {
                setUsers(users.filter(user => user.id !== userId));
            }
        } catch (e) {
            setError(`An error occurred while banning user: ${e instanceof Error ? e.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
            router.refresh();
        }
    }

    return (
        <section className="admin-page">
            <p className="eyebrow">Community</p>
            <h1>Manage users</h1>
            <p className="admin-intro">Review member accounts and manage access.</p>
            <hr/>

            {loading && <p className="page-loading" role="status">Loading users...</p>}
            {error && <p className="page-error" role="alert">{error}</p>}

            <ul className="users-list">
                {users.map(user => (
                    <li className="user-card" key={user.id}>
                        <p><strong>{user.username}</strong>Member</p>
                        <p><strong>Email</strong>{user.email}</p>
                        <p><strong>Role</strong><span className="user-role">{user.role}</span></p>
                        <p><strong>Joined</strong>{new Date(user.createdAt).toLocaleDateString()}</p>
                        <button
                            className="ban-button"
                            onClick={() => onBanUser(user.id)}
                            disabled={loading}
                        >
                            Ban user
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}