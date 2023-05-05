package com.example.tradex_watchlist.config;

import com.example.tradex_watchlist.model.TradeRequest;
import com.example.tradex_watchlist.model.TradeResponse;
import com.example.tradex_watchlist.services.JsonServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.*;
public class TradexSocketHandler implements WebSocketHandler {
    private WebSocketSession session;
    private final Logger logger = LoggerFactory.getLogger(TradexSocketHandler.class);
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.info("websocket connection established...");
        this.session = session;
        String msg = new TradeRequest("AAPL").toString();
        TextMessage message = new TextMessage(msg);
        session.sendMessage(message);
    }
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
        logger.info("message received...");
        String msg = (String) message.getPayload();
        TradeResponse tradeResponse = new JsonServices<TradeResponse>().getSingleRes(msg, TradeResponse.class);
        System.out.println(tradeResponse.toString());
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
