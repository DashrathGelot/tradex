# tradex

- tradex is a real time stock exchange watchlist web application where user register, sign-in to watch stock in real-time
- User can add faviourite stock into watchlist
- Developed user register, sign-in, sign-out flow for application
- User can set notification to on which amount application should notified to user. for example current AAPL stock price is 127 and user put notification to notified when price go up 128.
- Getting stock update from stock exchange service api here, tradex use Nasdaq update stock price calling websocket api to stock exchange service api and via sending company symbol like AAPL, MSFT after sending company symbol websocket will receive calls from api if it's first time entry then will put into global cache and whenever next client comes up with same company it will first check into global cache and if it exist in glocal cache then will return from the global cache otherwise it will send to stock exchange api service via websocket and store in global cache for future purpose.
- From client it will first made stock call with list of company symbols in the backend will check into global cache and then decide to call new or use from global cache this communicate using Server Sent Events protocol.
 


![tradex drawio](https://github.com/DashrathGelot/tradex/assets/48720952/38c08703-511d-4e97-99d3-0cd419ba1252)
