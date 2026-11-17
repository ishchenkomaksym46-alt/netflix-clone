import UsersPage from "@/app/(admin)/admin/users/Users";

export const metadata = {
    title: 'users',
    description: 'Users page',
}

export default function Users() {
    return (
        <div>
            <UsersPage />
        </div>
    )
}