"use client"
export default function SignupForm() {
    return (
       
    <form method="POST" action="/api/signup" className="flex flex-col items-center gap-4 p-2 m-2">
            <label htmlFor="email" >Email</label>
            <input id="email" name="email" type="email" required className="border-2 border-terracotta w-full max-w-lg"/>

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className="border-2 border-terracotta w-full max-w-lg"/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required className="border-2 border-terracotta w-full max-w-lg"/>

            <button type="submit" className="bg-terracotta text-white w-full max-w-sm rounded-lg p-2 m-2">Sign Up</button>
            </form>
    )
}
