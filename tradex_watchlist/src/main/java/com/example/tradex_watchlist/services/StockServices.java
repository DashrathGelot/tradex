package com.example.tradex_watchlist.services;

import com.example.tradex_watchlist.model.TradeData;
import com.example.tradex_watchlist.model.TradeRequest;
import com.example.tradex_watchlist.model.TradeResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;

@Service
public class StockServices {
    private WebSocketSession session;
    private final Logger logger = LoggerFactory.getLogger(StockServices.class);
    private SseEmitter sseEmitter;
    private TradeData prevTradeData;
    private final HashMap<String, Set<String>> compMap;
    private final Set<String> defaultCompanies;
    public StockServices() {
        defaultCompanies = new HashSet<>(List.of("AAPL", "MSFT", "AMZN", "GOOGL", "TSLA"));
        compMap = new HashMap<>();
    }
    public void setEmitter(SseEmitter sseEmitter) {
        if (this.sseEmitter != null) return;
        this.sseEmitter = sseEmitter;
        sseEmitter.onCompletion(() -> logger.info("SseEmitter is completed"));
        sseEmitter.onTimeout(() -> logger.info("SseEmitter is timed out"));
        sseEmitter.onError((ex) -> logger.info("SseEmitter got error:", ex));
    }
    public void setSession(WebSocketSession session) {
        this.session = session;
    }
    public void sendDefaultMessage() {
        try {
            for (String company : defaultCompanies) {
                TextMessage message = new TextMessage(new TradeRequest(company).toString());
                this.session.sendMessage(message);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendDefaultMessage(WebSocketSession webSocketSession) {
        try {
            for (String company : defaultCompanies) {
                TextMessage message = new TextMessage(new TradeRequest(company).toString());
                webSocketSession.sendMessage(message);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendReqMessage(String user) {
        try {
            Set<String> companies = compMap.get(user);
            if (companies == null) return;
            for (String company : compMap.get(user)) {
                TextMessage message = new TextMessage(new TradeRequest(company).toString());
                this.session.sendMessage(message);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public void registerCompany(String user, List<String> companies) {
        logger.info("register companies {}", companies);
        compMap.putIfAbsent(user, new HashSet<>());
        compMap.get(user).addAll(companies);
    }
    private boolean isMatch(TradeData currTradeData, TradeData prevTradeData) {
        return prevTradeData == null ||
                prevTradeData.getT() != currTradeData.getT() ||
                prevTradeData.getP() != currTradeData.getP();
    }
    private void sendTradeData(List<TradeData> tradeData) throws IOException {
        this.sseEmitter.send(
                SseEmitter.event()
                        .name(getEventName())
                        .data(tradeData, MediaType.APPLICATION_JSON)
        );
    }
    private String getEventName() {
        if (defaultCompanies.contains(prevTradeData.getS())) {
            return "default";
        }
        return "favorites";
    }
    public void streamStocks(TradeResponse res) {
        logger.info("Send Stock {} ", res);
        try {
            if (this.sseEmitter == null) {
                logger.info("Emitter is not set yet");
            } else if (res.getType().equals("ping")) {
                logger.info("server ping");
            } else {
                List<TradeData> tradeDataList = res.getTradeData();
                List<TradeData> uniqueTradeData = new ArrayList<>();
                for (TradeData tradeData : tradeDataList) {
                    if (isMatch(tradeData, prevTradeData)) {
                        uniqueTradeData.add(tradeData);
                    }
                    prevTradeData = tradeData;
                }
                if (!uniqueTradeData.isEmpty()) {
                    sendTradeData(uniqueTradeData);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
