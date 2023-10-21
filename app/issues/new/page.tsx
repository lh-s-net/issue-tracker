"use client"

import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Button, TextArea, TextField} from "@radix-ui/themes";

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root>
                <TextField.Input placeholder="Title"></TextField.Input>
            </TextField.Root>
            <SimpleMDE placeholder="Descriptioon"></SimpleMDE>
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;