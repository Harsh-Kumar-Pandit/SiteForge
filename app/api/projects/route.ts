import { db } from '@/config/db';
import { chatTable, frameTable, projectsTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'

export async function POST(req: NextRequest) {
    const {projectId, frameId, messages} = await req.json();
    const user = await currentUser();

    //Create Project 
    const projectResult = await db.insert(projectsTable).values({
        projectId: projectId,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
    })

    const frameResult = await db.insert(frameTable).values({
        frameId: frameId,
        projectId: projectId,
    })

    //Save user Msg
    const msgResult = await db.insert(chatTable).values({
        chatMesssge: messages,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
    })

    return NextResponse.json({ message: "Project Created", projectId, frameId, userMessage: messages})
}


