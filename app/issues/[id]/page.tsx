import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Button, Grid} from "@radix-ui/themes";
import delay from "delay";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import Link from "next/link";
import {Pencil2Icon} from "@radix-ui/react-icons";

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({params}: Props) => {
    if (isNaN(parseInt(params.id))) return notFound()

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue)
        return notFound()

    await delay(200)

    return (
        <Grid columns={{initial: "1", md: "2"}} gap="5">
            <Box>
                <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id}/>

                {/*myDetail*/}
                <div className="pt-5">
                    <Button>
                        <Link href={`/issues/${issue.id}/mydetail`} className="flex items-center">
                            <Pencil2Icon className="mr-2"/>
                            myDetail Issue
                        </Link>
                    </Button>
                </div>

            </Box>
        </Grid>
    );
};

export default IssueDetailPage;