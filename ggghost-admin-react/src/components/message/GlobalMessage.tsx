import React, {Fragment, useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import {Alert, Stack} from "@mui/material";

export interface IProps {
    content: string;
    duration: number;
    type: 'info' | 'warning' | 'error' | 'success';
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}
export const GlobalMessage = (props: any) => {
    const { content, duration, type, vertical, horizontal }: IProps = {...props};
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setIsOpen(false);
    }

    return (
        <Fragment>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={isOpen} autoHideDuration={duration} onClose={handleClose}
                          anchorOrigin={{vertical: vertical, horizontal: horizontal}}>
                    <Alert onClose={handleClose} sx={{width: '100%'}} severity={type} variant="filled">{content}</Alert>
                </Snackbar>
            </Stack>

        </Fragment>
    )
}