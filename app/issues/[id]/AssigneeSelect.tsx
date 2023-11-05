"use client"

import React, {useEffect, useState} from 'react';
import {Select} from "@radix-ui/themes";
import axios from "axios";
import {User} from "next-auth";

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            const {data} = await axios.get<User[]>("/api/users")
            setUsers(data)
        }
        fetchUser()
    }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..."/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map((user) =>
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )}

                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;