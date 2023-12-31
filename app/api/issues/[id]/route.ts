import authOptions from "@/app/auth/authOptions";
import {NextRequest, NextResponse} from "next/server";
import {patchIssueSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";

// PATCH
export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }) {

    const  session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({}, {status: 401})

    const body = await request.json()
    const validation = patchIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const {title, description, assignedToUserId} = body

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({where: {id: body.assignedToUserId}})
        if (!user)
            return NextResponse.json({error: "Invalid assigned user!"}, {status: 400})
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if (!issue)
        return NextResponse.json(
            {error: "Invalid issue"},
            {status: 404}
        )

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title,
            description,
            assignedToUserId
        }
    })

    return NextResponse.json(updatedIssue)

}

// DELETE
export async function DELETE(
    request: NextRequest,
    {params}: { params: { id: string } }) {

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })
    console.log(issue)
    if (!issue)
        return NextResponse.json({error: "Invalid issue"}, {status: 404})

    await prisma.issue.delete({
        where: {id: issue.id}
    })

    return NextResponse.json({})

}