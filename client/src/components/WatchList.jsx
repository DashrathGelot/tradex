import styled from "@emotion/styled";
import { Button, Grid, IconButton, Paper, Stack } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '1.5rem',
    width: '100%'
}));

export default function WatchList({data, onAdd, deleteStock}) {
    return (
        <Paper style={{width: '90%', height: '70vh', padding: 20}}>
            <Stack spacing={2}>
                <Item>Watch List</Item> 
                {
                    data.map(d => 
                        <Button>
                            <Item>
                            <Grid container>
                                <Grid item xs={4}>
                                    {d.symbol}
                                </Grid>
                                <Grid item xs={4}>
                                    {d.p}
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton onClick={() => deleteStock(d)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            </Item>
                        </Button>
                    )
                }
                <Button onClick={onAdd} size="large" color="primary" aria-label="add to shopping cart" startIcon={<AddCircleIcon />}>
                    Add Stock
                </Button>
            </Stack>
        </Paper>
    );
}