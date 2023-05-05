package com.example.tradex_watchlist.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JsonServices<T> {
    private final Logger logger = LoggerFactory.getLogger(JsonServices.class);

    public List<T> getResponse(String response, Class<T> type) {
        try {
            List<T> res = new ArrayList<>();
            JSONArray jsonArray = new JSONArray(response);
            for (int i = 0; i < jsonArray.length(); i++) {
                res.add(getSingleRes(jsonArray.getString(i), type));
            }
            return res;
        } catch (JSONException exception) {
            logger.error(exception.getMessage());
        }
        return List.of();
    }

    public T getSingleRes(String json, Class<T> type) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            return mapper.readValue(json, type);
        } catch (JsonProcessingException jsonException) {
            logger.error(jsonException.getMessage());
        }
        return null;
    }
}
