package com.example.tradex_watchlist.rest;
import java.util.*;
import com.example.tradex_watchlist.model.Company;
import com.example.tradex_watchlist.services.StockServices;
import com.example.tradex_watchlist.services.WatchListServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WatchListRest {
    @Autowired
    WatchListServices watchListServices;
    @Autowired
    StockServices stockSerivces;

    @GetMapping("/companies")
    public List<Company> getCompanies() {
        return watchListServices.getCompanies();
    }
}
