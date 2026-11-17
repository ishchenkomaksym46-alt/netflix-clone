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
        <div>
            <h1>Manage Users</h1>
            <hr/>

            {loading && <p className={'text-yellow-300'}>Loading...</p>}
            {error && <p className={'text-red-500'}>{error}</p>}

            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>

                        <button className={'font-bold bg-red-600 transform motion-safe:hover:bg-red-800 padding-2 cursor-pointer'}
                        onClick={() => onBanUser(user.id)}>BAN</button>
                        <hr/>
                    </li>
                ))}
            </ul>
        </div>
    )
}