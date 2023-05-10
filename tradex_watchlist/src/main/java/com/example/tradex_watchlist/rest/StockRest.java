package com.example.tradex_watchlist.rest;

import com.example.tradex_watchlist.config.TradexClient;
import com.example.tradex_watchlist.config.TradexSocketHandler;
import com.example.tradex_watchlist.services.StockServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/sse")
public class StockRest {
    @Autowired
    StockServices stockServices;
    private final Logger logger = LoggerFactory.getLogger(StockRest.class);
    @GetMapping("/stocks")
    @CrossOrigin
    public SseEmitter streamStock() {
        logger.info("Called /stocks api");
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        stockServices.setEmitter(sseEmitter);
        stockServices.sendDefaultMessage();
        stockServices.sendReqMessage("dash");
        return sseEmitter;
    }

    @PostMapping("/stocks")
    @CrossOrigin
    public void registerStock(@RequestBody List<String> companies) {
        logger.info("Register companies");
        stockServices.registerCompany("dash", companies);
        stockServices.sendReqMessage("dash");
    }
}
