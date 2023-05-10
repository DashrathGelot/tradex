package com.example.tradex_watchlist.model;

public class TradeData {
    private double p;
    private String s;
    private long t;
    private long v;
    public TradeData() {}
    public TradeData(double p, String s, long t, long v) {
        this.p = p;
        this.s = s;
        this.t = t;
        this.v = v;
    }

    public double getP() {
        return p;
    }

    public void setP(double p) {
        this.p = p;
    }

    public String getS() {
        return s;
    }

    public void setS(String s) {
        this.s = s;
    }

    public long getT() {
        return t;
    }

    public void setT(long t) {
        this.t = t;
    }

    public long getV() {
        return v;
    }

    public void setV(long v) {
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
