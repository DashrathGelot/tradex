package com.example.tradex_watchlist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TradexWatchlistApplication {

    public static void main(String[] args) {
        SpringApplication.run(TradexWatchlistApplication.class, args);
    }

}
