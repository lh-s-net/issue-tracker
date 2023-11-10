import React from 'react';
import {Flex} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "@/app/issues/list/IssueActions";
import {Status} from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/list/IssueTable";

// import Link from "next/link";

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({searchParams,}: Props) => {

    const statuse = Object.values(Status)
    const status = statuse.includes(searchParams.status)
        ? searchParams.status
        : undefined
    const where = {status}

    const orderBy = columnNames
        // .map(column => column.value)
        .includes(searchParams.orderBy)
        ? {[searchParams.orderBy]: "asc"}
        : undefined

    const page = parseInt(searchParams.page) || 1
    const pageSize = 10

    const issues = await prisma.issue.findMany({
        // where: {
        //     status: status
        // },
        where,
        // orderBy: {[searchParams.orderBy]: "asc"}
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize
    })
    console.log(searchParams)
    // const issueCount = await prisma.issue.count({where: {status}})
    const issueCount = await prisma.issue.count({where})

    return (
        <Flex direction={"column"} gap={"3"}>
            <IssueActions/>
            <IssueTable searchParams={searchParams} issues={issues}/>
            <Pagination
                itemCount={issueCount}
                pageSize={pageSize}
                currentPage={page}/>
        </Flex>
    );
};

// export const dynamic = "force-dynamic"
// export const revalidate =0 // revalidate every 0 seconds

export default IssuesPage
