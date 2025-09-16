import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EmptyState from "../components/EmptyState";

interface DashboardProps {
  user: {
    photoURL?: string;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50">
          <EmptyState />
        </main>
      </div>
    </div>
  );
}
