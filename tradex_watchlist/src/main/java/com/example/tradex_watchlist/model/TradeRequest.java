package com.example.tradex_watchlist.model;

public class TradeRequest {
    private String type;
    private String symbol;

    public TradeRequest(String symbol) {
        this("subscribe", symbol);
    }
    public TradeRequest(String type, String symbol) {
        this.type = type;
        this.symbol = symbol;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getType() {
        return type;
    }

    public String getSymbol() {
        return symbol;
    }
    @Override
    public String toString() {
        return "{\"type\":\"" +
                this.type +
                "\",\"symbol\":\"" +
                this.symbol + "\"}";
    }
}
