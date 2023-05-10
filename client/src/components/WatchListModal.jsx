import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chip, Grid, List, ListItemButton } from '@mui/material';

export default function WatchListModal({open, handleClose, data, setWatchList}) {
    const [stocks, setStocks] = React.useState([]);

    const addStock = (value) => {
        if (!stocks.find(stock => stock.symbol === value.symbol)) {
            const ar = [...stocks, value];
            setStocks(ar);
        }
    }
    const handleDelete = (value) => {
        const ar = stocks.filter(stock => stock.symbol !== value);
        setStocks(ar);
    }
    const onSubmit = () => {
        setWatchList(stocks);
    }

    return (    
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Stocks</DialogTitle>
            <div style={{padding: 2}}>
                <DialogContentText>
                    { stocks.map(stock => 
                        <Chip
                            key={stock.symbol}
                            style={{margin: 3}}
                            label={stock.symbol}
                            variant="outlined"
                            onClick={() => handleDelete(stock.symbol)}
                            onDelete={() => handleDelete(stock.symbol)}
                        />
                    )}
                </DialogContentText>
            </div>
            <DialogContent>
                <DialogContentText>
                    <List spacing={1} style={{width: 500}}>
                        { data.map(comp => {
                            return <ListItemButton onClick={() => addStock(comp)} key={comp.symbol}>
                                <Grid container>
                                    <Grid xs={6}>
                                        {comp.symbol} 
                                    </Grid>
                                    <Grid xs={6}>
                                        {comp.name}
                                    </Grid>
                                </Grid>
                            </ListItemButton>
                        }) }
                    </List>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSubmit}>Add Stock</Button>
            </DialogActions>
        </Dialog>
    );
}