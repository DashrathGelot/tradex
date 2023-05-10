package com.example.tradex_watchlist.config;

import com.example.tradex_watchlist.model.TradeResponse;
import com.example.tradex_watchlist.services.JsonServices;
import com.example.tradex_watchlist.services.StockServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

@Component
public class TradexSocketHandler implements WebSocketHandler {
    @Autowired
    StockServices stockServices;
    private WebSocketSession session;
    private final Logger logger = LoggerFactory.getLogger(TradexSocketHandler.class);
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        logger.info("websocket connection established...");
        this.session = session;
        stockServices.setSession(this.session);
    }
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
        logger.info("message received...");
        String msg = (String) message.getPayload();
        TradeResponse tradeResponse = new JsonServices<TradeResponse>().getSingleRes(msg, TradeResponse.class);
        stockServices.streamStocks(tradeResponse);
    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        logger.info("Client connection closed: {} ", status);
    }
    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        logger.info("Client transport error: {}", exception.getMessage());
    }

    public WebSocketSession getSession() {
        return session;
    }
}
