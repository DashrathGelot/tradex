package com.example.tradex_watchlist.model;

public class TradeData {
    private String p;
    private String s;
    private String t;
    private String v;

    public TradeData() {}

    public TradeData(String p, String s, String t, String v) {
        this.p = p;
        this.s = s;
        this.t = t;
        this.v = v;
    }

    public String getP() {
        return p;
    }

    public String getS() {
        return s;
    }

    public String getT() {
        return t;
    }

    public String getV() {
        return v;
    }

    public void setP(String p) {
        this.p = p;
    }

    public void setS(String s) {
        this.s = s;
    }

    public void setT(String t) {
        this.t = t;
    }

    public void setV(String v) {
        this.v = v;
    }

    @Override
    public String toString() {
        return "TradeData{" +
                "p='" + p + '\'' +
                ", s='" + s + '\'' +
                ", t='" + t + '\'' +
                ", v='" + v + '\'' +
                '}';
    }
}
