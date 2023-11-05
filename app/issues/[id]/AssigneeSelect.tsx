"use client"

import React, {useEffect, useState} from 'react';
import {Select} from "@radix-ui/themes";
import axios from "axios";
import {User} from "next-auth";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";

const AssigneeSelect = () => {

    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000, // 60 seconds cache - is optional
        retry: 3
    })

    if (isLoading) return <Skeleton/>
    if (error) return null

    // eplaced with TQuery
    // const [users, setUsers] = useState<User[]>([])
    // useEffect(() => {
    //     //     const fetchUser = async () => {
    //     //         const {data} = await axios.get<User[]>("/api/users")
    //     //         setUsers(data)
    //     //     }
    //     //     fetchUser()
    //     // }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..."/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map((user) =>
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )}

                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;