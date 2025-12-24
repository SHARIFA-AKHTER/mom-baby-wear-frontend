"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';


export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex gap-2"
      onClick={handleGoogleLogin}
    >
      <FcGoogle size={20} />
      Continue with Google
    </Button>
  );
}
