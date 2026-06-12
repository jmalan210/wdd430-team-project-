"use client"
export default function SignupForm() {
    return (
       <div className="flex flex-col items-center my-4 min-h-screen">
        <form method="POST" action="/api/signup" className="flex flex-col gap-4 p-6 border rounded-lg w-80">
            <label htmlFor="firstName">First Name:</label>
            <input id="firstName" name="firstName" type="text" required className="border p-2" />

            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" name="lastName" type="text" required className="border p-2"/>

            <label htmlFor="email" >Email</label>
            <input id="email" name="email" type="email" required className="border p-2"/>

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className="border p-2"/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required className="border p-2"/>

            <button type="submit"  className="bg-terracotta text-white p-2 rounded-lg">Sign Up</button>
            </form>
            </div>
    )
}
