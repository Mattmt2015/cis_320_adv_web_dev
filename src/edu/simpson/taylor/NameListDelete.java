package edu.simpson.taylor;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "NameListDelete")
public class NameListDelete extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        System.out.println("Made Servlet Connection");
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);
        Person fromJson = null;
        try
        {
            Gson gson = new Gson();
            fromJson = gson.fromJson(requestString, Person.class);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        System.out.println("Hello World 4 "+ fromJson.getId());
        PersonDAO.deletePerson(fromJson);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}
