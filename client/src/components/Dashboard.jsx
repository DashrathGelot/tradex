import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Stock from "./Stock";
import WatchList from "./WatchList";
import Footer from "./Footer";
import { allCompanies } from "../services/watchListService";
import WatchListModal from "./WatchListModal";

export default function Dashboard() {
    const [listening, setListening] = useState(false);
    const [stockSymbols, setStockSymbols] = useState([]);
    const [showCompanies, setShowCompanies] = useState(false);
    const [watchListData, setWatchListData] = useState([]);
    const [data, setData] = useState([]);
    const [aapl, setAapl] = useState({s: 'AAPL', p: 0});
    const [googl, setGoogl] = useState({s: 'GOOGL', p: 0});
    const [tsla, setTsla] = useState({s: 'TSLA', p: 0});
    const [msft, setMsft] = useState({s: 'MSFT', p: 0});
    const [amzn, setAmzn] = useState({s: 'AMZN', p: 0});
    const [symb, setSymb] = useState('AAPL');

    const callEventSource = () => {
        const eventSource = new EventSource("http://localhost:8080/sse/stocks");

        eventSource.onopen = (event) => {
            console.log("connection opened")
        }

        eventSource.onmessage = (event) => {
          console.log("result", event.data);
        }

        eventSource.addEventListener("default", (event) => {
            const d = JSON.parse(event.data);
            setData((old) => old.concat(d.filter(d => d.s === symb)));
            d.forEach(element => {
                if (element) {
                    const symb = element.s;
                    if (symb === 'AAPL') {
                        setAapl(element);
                    } else if (symb === 'MSFT') {
                        setMsft(element);
                    } else if (symb === 'GOOGL') {
                        setGoogl(element);
                    } else if (symb === 'TSLA') {
                        setTsla(element);
                    } else {
                        setAmzn(element);
                    }
                }
            });
        });

        eventSource.addEventListener("favorites", (event) => {
            setData((old) => old.concat(JSON.parse(event.data)));
        });

        eventSource.onerror = (event) => {
          console.log(event.target.readyState)
          if (event.target.readyState === EventSource.CLOSED) {
            console.log('eventsource closed (' + event.target.readyState + ')')
          }
          eventSource.close();
        }
    }

    useEffect(() => {
        if (stockSymbols.length > 0) return;
        allCompanies().then(res => {
            setStockSymbols(res);
        }).catch(e => {
            console.log("in error ");
            console.log(e);
        });
    },[]);
  
    // useEffect(() => {
    //     let eventSource;
    //     if (!listening) {
    //         callEventSource(eventSource);
    //         setListening(true);
    //     }
    //     return () => {
    //         eventSource && eventSource.close();
    //         console.log("eventsource closed")
    //     }
    // }, []);

    const showWatchListCompanies = (e) => {
        e.preventDefault();
        setShowCompanies(true);
    }

    const setWatchList = (stocks) => {
        setWatchListData(stocks);
        setShowCompanies(false);
    }

    const deleteStock = (stk) => {
        const ar = watchListData.filter(stock => stock.symbol !== stk.symbol);
        setWatchListData(ar);
    }

    // const getAAPLData = () => {
    //     const aapl = data.filter(d => d.s === 'AAPL')
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Stock data={data} symbol={symb} onClick={callEventSource}/>
            </Grid>
            <Grid item xs={4}>
                <WatchList 
                    data={watchListData} 
                    onAdd={showWatchListCompanies}
                    deleteStock={deleteStock}
                />
            </Grid>
            <Grid item>
                <Footer onClick={(s) => setSymb(s)} data={[aapl, googl, tsla, msft, amzn]}/>
            </Grid>
            {
                showCompanies && <WatchListModal 
                    data={stockSymbols} 
                    open={showCompanies} 
                    handleClose={() => setShowCompanies(false)}
                    setWatchList={setWatchList}
                />
            }
        </Grid>
    );
}