
export default function AdminProducts(){
    return(
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Example Product Cards */}
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Product {id}</h2>
            <p className="text-gray-500">Price: $20{id}</p>
          </div>
        ))}
      </div>
        </div>
    )
}