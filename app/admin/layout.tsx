import AdminShell from "@/components/Admin/Components/AdminShell";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#040421]">
            <AdminShell>{children}</AdminShell>
        </div>
    );
}
