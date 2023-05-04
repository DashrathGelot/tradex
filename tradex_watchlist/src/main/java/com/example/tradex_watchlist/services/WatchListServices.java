package com.example.tradex_watchlist.services;

import com.example.tradex_watchlist.model.Company;
import com.example.tradex_watchlist.repository.CompanyRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
@Service
public class WatchListServices {
    @Autowired
    CompanyRepository companyRepository;

    @Value("${stock.api}")
    private String api;
    @Value("${stock.api_key}")
    private String apiKey;

    public List<Company> fetchAllCompany() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(api + "/nasdaq_constituent?apikey=" + apiKey, String.class);
        try {
            List<Company> companies = new ArrayList<>();
            JSONArray jsonObject = new JSONArray(response);
            for (int i = 0; i < jsonObject.length(); i++) {
                JSONObject entry = jsonObject.getJSONObject(i);
                companies.add(
                        new Company(
                                entry.getString("symbol"),
                                entry.getString("name"),
                                entry.getString("headQuarter")
                        )
                );
            }
            return companies;
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
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
