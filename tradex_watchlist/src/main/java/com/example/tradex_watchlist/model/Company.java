package com.example.tradex_watchlist.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

@Entity
public class Company {
    @Id
    private String symbol;
    private String name;
    private String headQuarter;

    public Company() {}
    public Company(String symbol, String name, String location) {
        this.symbol = symbol;
        this.name = name;
        this.headQuarter = location;
    }

    public Company(JSONObject jsonObject) throws JSONException {
        this.name = jsonObject.getString("name");
        this.symbol = jsonObject.getString("symbol");
        this.headQuarter = jsonObject.getString("headQuarter");
    }

    public String getSymbol() {
        return symbol;
    }

    public String getName() {
        return name;
    }

    public String getHeadQuarter() {
        return headQuarter;
    }
}
