
export default function AdminOrders() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">User</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((id) => (
            <tr key={id} className="border-t">
              <td className="py-2 px-4">#{100 + id}</td>
              <td className="py-2 px-4">User {id}</td>
              <td className="py-2 px-4">${id * 20}</td>
              <td className="py-2 px-4">Pending</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
