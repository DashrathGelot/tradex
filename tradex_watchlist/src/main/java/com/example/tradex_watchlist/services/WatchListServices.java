package com.example.tradex_watchlist.services;

import com.example.tradex_watchlist.model.Company;
import com.example.tradex_watchlist.repository.CompanyRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class WatchListServices {
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    JsonServices<Company> jsonServices;
    @Value("${stock.api}")
    private String api;
    @Value("${stock.api_key}")
    private String apiKey;
    private final Logger logger = LoggerFactory.getLogger(JsonServices.class);
    public List<Company> fetchAllCompany() {
        logger.info("Fetching Company list from API........");
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(api + "/nasdaq_constituent?apikey=" + apiKey, String.class);
        return jsonServices.getResponse(response, Company.class);
    }
    @PostConstruct
    @Cacheable(value = "companies")
    public List<Company> getCompanies() {
        List<Company> companies = companyRepository.findAll();
        if (companies.isEmpty()) {
            companies = fetchAllCompany();
            saveCompanies(companies);
        }
        return companies;
    }

    public void saveCompanies(List<Company> companies) {
        companyRepository.saveAll(companies);
    }
}
