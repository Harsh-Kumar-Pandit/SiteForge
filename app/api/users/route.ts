import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
    const user = await currentUser();

    // Check whether the signed-in user already exists in the database.
    const userResult = await db.select().from(usersTable)
    .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress ?? ""))
    
    // Insert the user only if they do not already exist.
    if (userResult?.length === 0) {
        const data = {
            name: user?.fullName || '',
            email: user?.primaryEmailAddress?.emailAddress || '',
            credits: 2,
        }
        const result = await db.insert(usersTable).values({
            ...data
        })
        return NextResponse.json({ message: "User Created", user: data })
    }

    return NextResponse.json({ message: "User Created", user: userResult[0] })
}
