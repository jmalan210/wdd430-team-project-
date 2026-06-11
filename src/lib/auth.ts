import bcrypt from "bcrypt";
import { getUserByEmail } from "@/lib/users";


export async function loginUser(email: string, password: string) {
    const user = await getUserByEmail(email);

    if (!user) {
        return {success: false}}
        
    

    const valid = await bcrypt.compare(
        password, user.passwordHash
    );

    if (!valid) {
        return { success: false };
    }
    return { success: true, user };
}