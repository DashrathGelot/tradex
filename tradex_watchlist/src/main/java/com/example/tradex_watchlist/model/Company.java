package com.example.tradex_watchlist.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Company {
    @Id
    private String symbol;
    private String name;
    private String location;

    public Company() {}
    public Company(String symbol, String name, String location) {
        this.symbol = symbol;
        this.name = name;
        this.location = location;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }
}
