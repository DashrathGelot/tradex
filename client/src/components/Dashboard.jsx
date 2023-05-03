import { Grid } from "@mui/material";
import React from "react";
import Stock from "./Stock";
import WatchList from "./WatchList";

export default function Dashboard() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Stock/>
            </Grid>
            <Grid item xs={4}>
                <WatchList/>
            </Grid>
        </Grid>
    );
}