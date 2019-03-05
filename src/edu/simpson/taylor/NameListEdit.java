package edu.simpson.taylor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import com.google.gson.Gson;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        System.out.println("Hello World 1");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        out.println("JSON Post");
        System.out.println("Hello World 2");

        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        out.println(requestString);
        System.out.println("Hello World 3 "+ requestString);

        Person fromJson = null;
        try
        {
            Gson gson = new Gson();
            fromJson = gson.fromJson(requestString, Person.class);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        System.out.println("Hello World 4");

        out.println("Object test: "+fromJson.getFirst());
        System.out.println("Hello World 5");

        PersonDAO.addPerson(fromJson);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}
