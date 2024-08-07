package com.example;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import spark.Request;
import spark.Response;
import static spark.Spark.*;

public class DataHandler {

    public static void main(String[] args) {
        port(8080);

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        post("/saveData", (req, res) -> {
            String data = req.body();
            saveDataToFile(data);
            return "Success";
        });

        get("/getData", (req, res) -> {
            res.type("application/json");
            return readDataFromFile();
        });
    }

    private static void saveDataToFile(String data) {
        try (FileWriter fileWriter = new FileWriter("data.txt", true);
             PrintWriter printWriter = new PrintWriter(fileWriter)) {
            printWriter.println(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String readDataFromFile() {
        StringBuilder jsonData = new StringBuilder("[");
        Gson gson = new Gson();
        
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader("data.txt"))) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                Map<String, String> map = gson.fromJson(line, new TypeToken<Map<String, String>>(){}.getType());
                jsonData.append(gson.toJson(map)).append(",");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        if (jsonData.length() > 1) {
            jsonData.deleteCharAt(jsonData.length() - 1); 
        }
        
        jsonData.append("]");
        return jsonData.toString();
    }
}
