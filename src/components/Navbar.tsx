import { Menu, Plus } from "lucide-react";

interface NavbarProps {
  user: {
    photoURL?: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 shadow bg-white">
      {/* Botón hamburguesa */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Menu size={24} />
        </button>
        <span className="text-lg font-medium">Mi Aula</span>
      </div>

      {/* Botón + y perfil */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Plus size={24} />
        </button>
        <img
          src={user?.photoURL || "/placeholder-profile.png"}
          alt="Perfil"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
}
