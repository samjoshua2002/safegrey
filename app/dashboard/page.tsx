export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Welcome back, Admin</h1>
            <p className="text-[var(--muted-foreground)]">
                Select an option from the sidebar to manage your website content.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Quick Stats</h3>
                    <p className="text-[var(--muted-foreground)]">Overview of your platform activity will appear here.</p>
                </div>
                <div className="p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Recent Activity</h3>
                    <p className="text-[var(--muted-foreground)]">Recent actions and updates will be listed here.</p>
                </div>
            </div>
        </div>
    )
}
