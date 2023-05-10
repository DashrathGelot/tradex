import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import React from "react";

const Item = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '1.5rem',
    borderRadius: 5
}));

export default function Footer({data, onClick}) {
    return (
        <Stack spacing={2} direction="row">
            {
                data.map((d, index) => 
                    <Item onClick={() => onClick(d.s)} key={index}>
                        <div>
                            {d.s}
                        </div>
                        <div>
                            {d.p}
                        </div>
                    </Item>
                )
            }
        </Stack>
    );
}