import React from 'react';
import {Button} from "@radix-ui/themes";
import Link from "next/link";
import {Pencil2Icon} from "@radix-ui/react-icons";

const EditIssueButton = ({issueId}: { issueId: number }) => {
    return (
        <Button>
            <Link href={`/issues/${issueId}/edit`} className="flex items-center">
                <Pencil2Icon className="mr-2"/>
                Edit Issue
            </Link>
        </Button>
    );
};

export default EditIssueButton;