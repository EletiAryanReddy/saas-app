"use client";

export default function GoogleLoginButton() {
  const googleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      type="button"
      onClick={googleLogin}
      className="w-full border p-2 rounded mt-3"
    >
      Continue with Google
    </button>
  );
}