import { auth } from "@/auth";

export default async function TestPage() {
    const session = await auth();

    console.log(session);

    return (
        <pre>
            {JSON.stringify(session, null, 2)}
        </pre>
    );
}