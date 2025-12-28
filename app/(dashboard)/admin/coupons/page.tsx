
export default function AdminCoupons() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Coupons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">COUPON{id}</h2>
            <p>Discount: {id * 10}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
                           