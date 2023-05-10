package com.example.tradex_watchlist.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TradeResponse {
    @JsonProperty("data")
    private List<TradeData> data;
    private String type;

    public TradeResponse() {}

    public TradeResponse(List<TradeData> data, String type) {
        this.data = data;
        this.type = type;
    }

    public List<TradeData> getTradeData() {
        return data;
    }

    public void setTradeData(List<TradeData> tradeData) {
        this.data = tradeData;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "TradeResponse{" +
                "data=" + data +
                ", type='" + type + '\'' +
                '}';
    }
}
