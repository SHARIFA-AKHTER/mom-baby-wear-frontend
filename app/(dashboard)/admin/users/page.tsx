
// "use client";

// import { useEffect, useState } from "react";
// import { UserService } from "@/app/services/user.service";

// interface User {
//   id: string;
//   email: string;
//   name?: string;
//   role: "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";
//   status: "ACTIVE" | "INACTIVE" | "BANNED";
// }

// export default function AdminUsers() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     UserService.getAll().then((data) => {
//       setUsers(data);
//       setLoading(false);
//     });
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure?")) return;

//     await UserService.delete(id);
//     setUsers((prev) => prev.filter((u) => u.id !== id));
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Users</h1>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="border-t">
//                 <td className="p-3">{user.name || "N/A"}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">{user.status}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="bg-white p-4 rounded-lg shadow space-y-2"
//           >
//             <p><b>Name:</b> {user.name || "N/A"}</p>
//             <p><b>Email:</b> {user.email}</p>
//             <p><b>Role:</b> {user.role}</p>
//             <p><b>Status:</b> {user.status}</p>

//             <button
//               onClick={() => handleDelete(user.id)}
//               className="w-full py-2 bg-red-500 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { UserService } from "@/app/services/user.service";
import { Trash2, UserCheck, Shield, Loader2, Users } from "lucide-react";

interface User {
  id: string;
  email: string;
  name?: string;
  role: "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";
  status: "ACTIVE" | "INACTIVE" | "BANNED";
}

export default function AdminUsers() {
  
  const [usersData, setUsersData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getAll()
      .then((res: any) => {
        
        setUsersData(res.data?.data || res.data || res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const userList: User[] = Array.isArray(usersData) 
    ? usersData 
    : usersData?.result || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await UserService.delete(id);
      const filteredList = userList.filter((u) => u.id !== id);
      
    
      if (Array.isArray(usersData)) {
        setUsersData(filteredList);
      } else {
        setUsersData({ ...usersData, result: filteredList });
      }
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <Loader2 className="animate-spin mb-2" size={32} />
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">Manage all registered users and their roles</p>
        </div>
        <div className="bg-[#6C5DD3]/10 text-[#6C5DD3] px-4 py-2 rounded-xl text-sm font-bold border border-[#6C5DD3]/20">
          Total Users: {userList.length}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-hidden bg-white rounded-[24px] shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">User Details</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {userList.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#6C5DD3] font-bold">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user.name || "N/A"}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                   <span className="flex items-center gap-1.5 font-medium text-gray-600">
                     <Shield size={14} className="text-[#6C5DD3]" />
                     {user.role}
                   </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                    user.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {userList.map((user) => (
          <div key={user.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6C5DD3] text-white flex items-center justify-center font-bold">
                  {user.name?.[0] || user.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{user.name || "N/A"}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {user.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{user.role}</span>
              <button
                onClick={() => handleDelete(user.id)}
                className="flex items-center gap-1 text-red-500 text-sm font-bold"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {userList.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <Users className="mx-auto text-gray-200 mb-4" size={50} />
          <p className="text-gray-400 font-medium">No users found in the database.</p>
        </div>
      )}
    </div>
  );
}