package com.rafaelteixeiraserafim.tcc.utils;

import java.util.Map;

public final class MapUtils {
    private MapUtils() {}

    public static void printMap(Map<String, Object> map) {
        printMap(map, 0);
    }

    private static void printMap(Map<String, Object> map, int indent) {
        String indentSpace = " ".repeat(indent * 2);
        map.forEach((key, value) -> {
            if (value instanceof Map) {
                System.out.println(indentSpace + key + ":");
                printMap((Map<String, Object>) value, indent + 1);
            } else {
                System.out.println(indentSpace + key + ": " + value);
            }
        });
    }
}
