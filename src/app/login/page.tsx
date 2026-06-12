"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormEvent } from "react";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const signup = searchParams.get("signup");
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
            
        });

        if (res?.error) {
            setError("Invalid email or password");
            return;
        }
        router.push("/");
        router.refresh();
    }

    return (
        <>
            {signup === "success" && (
                <div className="mb-4 rounded-lg border border-green-600 bg-green-100 p-3">
                    Account created! Please log in!
                </div>
            )}
      
            <div className="flex flex-col items-center my-4 min-h-screen">
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-4 p-6 border rounded-lg w-80">
                    <h1>Login</h1>
                    <input type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2"
                        required
                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2"
                        required
                    />

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button type="submit"
                        className="bg-terracotta text-white p-2 rounded-lg">Log in</button>
                </form>
                <Link href="/signup">Create a new account</Link>
            </div>
        </>
    );
}