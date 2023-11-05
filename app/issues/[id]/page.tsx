import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Button, Flex, Grid} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import Link from "next/link";
import {Pencil2Icon} from "@radix-ui/react-icons";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

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

    return (
        <Grid columns={{initial: "1", sm: "5"}} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <AssigneeSelect issue={issue}/>
                    <EditIssueButton issueId={issue.id}/>
                    <DeleteIssueButton issueId={issue.id}/>

                    {/*myDetail*/}
                    <Button>
                        <Link href={`/issues/${issue.id}/mydetail`} className="flex items-center">
                            <Pencil2Icon className="mr-2"/>
                            myDetail Issue
                        </Link>
                    </Button>
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;