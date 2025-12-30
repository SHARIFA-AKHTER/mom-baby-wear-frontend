"use client";

import { useEffect, useState } from "react";
import { StockService } from "@/app/services/stock.service";
import { 
  Package, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Search, 
  History, 
  Loader2 
} from "lucide-react";

interface StockLog {
  id: string;
  productId: string;
  product: {
    name: string;
  };
  change: number;
  reason: string;
  createdAt: string;
}

export default function StockLogPage() {
  const [logs, setLogs] = useState<StockLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await StockService.getAllLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log =>
    log.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            <Package className="text-pink-600" size={32} /> Stock History
          </h1>
          <p className="text-gray-500">Track every stock change and movement</p>
        </div>
        <div className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl font-bold border border-pink-100">
          Total Entries: {logs.length}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by product or reason (e.g. RESTOCK, ORDER)..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-pink-500 outline-none transition"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table & List Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-pink-500 mb-2" size={40} />
            <p className="text-gray-400">Fetching logs...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <tr>
                    <th className="p-5">Product</th>
                    <th className="p-5">Adjustment</th>
                    <th className="p-5">Reason</th>
                    <th className="p-5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-5">
                        <p className="font-bold text-gray-800">{log.product?.name || "Unknown Product"}</p>
                        <p className="text-[10px] text-gray-400">ID: {log.productId}</p>
                      </td>
                      <td className="p-5">
                        <div className={`flex items-center gap-1 font-black ${log.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {log.change > 0 ? <ArrowUpCircle size={16} /> : <ArrowDownCircle size={16} />}
                          {log.change > 0 ? `+${log.change}` : log.change}
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                          log.reason === 'RESTOCK' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          log.reason === 'ORDER' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          'bg-gray-50 text-gray-600 border-gray-100'
                        }`}>
                          {log.reason}
                        </span>
                      </td>
                      <td className="p-5 text-gray-400 text-sm">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-800">{log.product?.name}</p>
                    <div className={`font-black ${log.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {log.change > 0 ? `+${log.change}` : log.change}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold uppercase">{log.reason}</span>
                    <span className="text-gray-400">{new Date(log.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && filteredLogs.length === 0 && (
          <div className="text-center py-20">
            <History className="mx-auto text-gray-200 mb-4" size={60} />
            <p className="text-gray-500 font-medium">No stock movements found</p>
          </div>
        )}
      </div>
    </div>
  );
}