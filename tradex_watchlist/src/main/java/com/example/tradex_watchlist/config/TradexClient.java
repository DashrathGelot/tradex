package com.example.tradex_watchlist.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;

@Configuration
public class TradexClient {
    @Value("${stock.websocket.URL}")
    private String URL;
    @Value("${stock.websocket.token}")
    private String token;
    @Bean
    public WebSocketConnectionManager webSocketConnectionManager() {
        WebSocketConnectionManager manager = new WebSocketConnectionManager(
                webSocketClient(),
                webSocketHandler(),
                URL + token
        );
        manager.setAutoStartup(true);
        return manager;
    }
    @Bean
    public WebSocketClient webSocketClient() {
        return new StandardWebSocketClient();
    }
    @Bean
    public WebSocketHandler webSocketHandler() {
        return new TradexSocketHandler();
    }
}
