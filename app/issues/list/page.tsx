import React from 'react';
import {Table} from "@radix-ui/themes";
import {IssueStatusBadge, Link} from "@/app/components"
import prisma from "@/prisma/client";
import IssueActions from "@/app/issues/list/IssueActions";
import {Issue, Status} from "@prisma/client";
import NextLink from "next/link";
import {ArrowUpIcon} from "@radix-ui/react-icons";

// import Link from "next/link";

interface Props {
    searchParams: { status: Status, orderBy: keyof Issue }
}

const IssuesPage = async ({searchParams,}: Props) => {

    const columns: {
        label: string
        value: keyof Issue
        className?: string
    }[] = [
        {label: "Issue", value: "title",},
        {label: "Status", value: "status", className: "hidden md:table-cell"},
        {label: "Created", value: "createdAt", className: "hidden md:table-cell"}
    ]

    const statuse = Object.values(Status)
    const status = statuse.includes(searchParams.status)
        ? searchParams.status
        : undefined

    const issues = await prisma.issue.findMany({
        where: {
            status: status
        },
        orderBy: {
            // [searchParams.orderBy]: "asc"
        }
    })

    return (
        <div>
            <IssueActions/>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map(column =>
                            <Table.ColumnHeaderCell key={column.value}>
                                <NextLink href={{
                                    query: {...searchParams, orderBy: column.value}
                                }}>{column.label}</NextLink>
                                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                            </Table.ColumnHeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status}/>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status}/>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

// export const dynamic = "force-dynamic"
// export const revalidate =0 // revalidate every 0 seconds

export default IssuesPage
