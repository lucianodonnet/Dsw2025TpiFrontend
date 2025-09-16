export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <img src="/classroom-empty.png" alt="Empty state" className="w-40 mb-6" />
      <p className="text-gray-700 mb-4">Añade una clase para empezar</p>
      <div className="flex gap-4">
        <button className="text-blue-600 hover:underline">Crear clase</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Unirse a clase
        </button>
      </div>
    </div>
  );
}
