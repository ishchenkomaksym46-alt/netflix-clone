import AdminPage from "@/app/(admin)/admin/AdminPage";

export const metadata = {
    title: 'admin',
    description: 'Admin page',
}

export default function Admin() {
    return (
        <div>
            <AdminPage />
        </div>
    )
}