"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type Me = { name: string; email: string };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // get current user
    api.get("/users/me")
      .then((res) => setMe(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  const logout = () => {
    // i need alert are you sure?
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  const linkClass = (href: string) =>
    `block rounded px-3 py-2 ${
      pathname === href ? "bg-white text-black" : "text-white/80 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen flex">
      <aside className="w-72 bg-gray-900 text-white p-4 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">SomaliDev Hub</h2>
          {me && (
            <p className="text-xs text-white/70 mt-1">
              {me.name} • {me.email}
            </p>
          )}
        </div>

        <nav className="space-y-2">
          <Link className={linkClass("/dashboard")} href="/dashboard">
            Projects
          </Link>
        </nav>

        <div className="mt-auto">
          <button
            onClick={logout}
            className="w-full bg-white text-black rounded px-3 py-2 font-medium hover:bg-gray-200 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
