
export default function AdminUsers() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {[1, 2, 3].map((id) => (
          <li key={id} className="bg-white p-4 rounded shadow flex justify-between">
            <span>User {id}</span>
            <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}