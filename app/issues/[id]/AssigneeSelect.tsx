"use client"

// import React, {useEffect, useState} from 'react';
import {Select} from "@radix-ui/themes";
import axios from "axios";
import {User} from "next-auth";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import {Issue} from "@prisma/client";
import toast, {Toaster} from "react-hot-toast"

const AssigneeSelect = ({issue}: { issue: Issue }) => {

    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000, // 60 seconds cache - is optional
        retry: 3 // 3 try's - is optional
    })

    if (isLoading) return <Skeleton/>
    if (error) return null

    // replaced with TQuery
    // const [users, setUsers] = useState<User[]>([])
    // useEffect(() => {
    //     //     const fetchUser = async () => {
    //     //         const {data} = await axios.get<User[]>("/api/users")
    //     //         setUsers(data)
    //     //     }
    //     //     fetchUser()
    //     // }, [])

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={(userId) => {
                    axios.patch("/api/issues/" + issue.id, {assignedToUserId: userId || null})
                        .catch(() => {
                            toast.error("Changes could not be saved.")
                        })
                }}>
                <Select.Trigger placeholder="Assign..."/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={null!}>Unassigned</Select.Item>
                        {users?.map((user) =>
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )}

                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster/>
        </>
    );
};

export default AssigneeSelect;