import React from 'react';
import {Box} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const LoadingIssuesDetail = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton/>
            <Skeleton height="20rem"/>
        </Box>
    );
};

export default LoadingIssuesDetail;