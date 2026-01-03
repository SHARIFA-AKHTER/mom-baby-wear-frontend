"use client";
import { useAuthContext } from "@/app/providers/AuthProvider";
import Image from "next/image";
import { Mail, Shield, User as UserIcon, Camera } from "lucide-react"; 

export default function ProfilePage() {
  const { data: user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 animate-pulse">
        <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 p-6 rounded-xl text-center">
          <p className="text-red-600 font-semibold text-lg">Access Denied</p>
          <p className="text-gray-500">Please login to view your profile details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-4">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header/Cover Background */}
        <div className="h-32 bg-linear-to-r from-pink-500 to-rose-400"></div>

        <div className="relative px-8 pb-10">
          {/* Profile Image Section */}
          <div className="relative -mt-16 mb-6 flex justify-center md:justify-start">
            <div className="relative w-32 h-32 group">
              <Image
                src={user.profileImage || "https://www.shutterstock.com/image-photo/indian-baby-girl-sitting-on-600nw-2168016381.jpg"} 
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg bg-white"
              />
              <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-100">
                <Camera size={16} className="text-pink-600" />
              </button>
            </div>
          </div>

          {/* User Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {user.name || user.email?.split("@")[0]}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 mb-4 uppercase tracking-widest text-xs font-bold">
                <Shield size={14} className="text-pink-500" />
                <span>{user.role}</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-pink-500">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold leading-none">Email Address</p>
                    <p className="text-gray-700 font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-pink-500">
                    <UserIcon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold leading-none">Account Status</p>
                    <p className="text-green-600 font-bold text-sm">● {user.status || "Active"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings / Quick Links */}
            <div className="bg-pink-50/50 p-6 rounded-3xl border border-pink-100 self-start">
              <h3 className="font-bold text-gray-800 mb-4">Account Settings</h3>
              <ul className="space-y-3">
                <li className="text-sm text-pink-700 hover:underline cursor-pointer font-medium">Edit Profile Info</li>
                <li className="text-sm text-pink-700 hover:underline cursor-pointer font-medium">Change Password</li>
                <li className="text-sm text-pink-700 hover:underline cursor-pointer font-medium">Notification Settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}