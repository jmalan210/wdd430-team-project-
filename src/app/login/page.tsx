import LoginForm from "@/components/LoginForm";

export default async function LoginPage({
    searchParams,
}: {
        searchParams: Promise<{ signup?: string }>;
}) {
    const params = await searchParams
   
    

    return (
        <>
            {params.signup === "success" && (
                <div className="mb-4 rounded-lg border border-green-600 bg-green-100 p-3">
                    Account created! Please log in!
                </div>
            )}
      
           <LoginForm />
        </>
    );
}