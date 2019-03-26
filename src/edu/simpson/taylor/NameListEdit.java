package edu.simpson.taylor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import com.google.gson.Gson;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet
{
    private Pattern nameValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEdit()
    {
        // --- Compile and set up all the regular expression patterns here ---
        nameValidationPattern = Pattern.compile("^.{1,30}$");
        phoneValidationPattern = Pattern.compile("^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$");
        birthdayValidationPattern = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    }

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
        boolean valid = true;

        out.println("Object test: " + fromJson.getFirst());
        System.out.println("Hello World 5");

        // First Name Back-End Validation
        Matcher m = nameValidationPattern.matcher(fromJson.getFirst());
        if (m.find())
        {
            System.out.println("Passed validation");
        } else
            {
            System.out.println("Did not pass validation");
            valid = false;
        }

        // Last Name Back-End Validation
        m = nameValidationPattern.matcher(fromJson.getLast());
        if (m.find())
        {
            System.out.println("Passed validation");
        } else
            {
            System.out.println("Did not pass validation");
            valid = false;
        }

        // Email Back-End Validation
        m = nameValidationPattern.matcher(fromJson.getEmail());
        if (m.find())
        {
            System.out.println("Passed validation");
        } else
            {
            System.out.println("Did not pass validation");
            valid = false;
        }

        // Phone Number Back-End Validation
        m = phoneValidationPattern.matcher(fromJson.getPhone());
        if (m.find())
        {
            System.out.println("Passed validation");
        } else
            {
            System.out.println("Did not pass validation");
            valid = false;
        }

        // Birthday Back-End Validation
        m = birthdayValidationPattern.matcher(fromJson.getBirthday());
        if (m.find())
        {
            System.out.println("Passed validation");
        } else
            {
            System.out.println("Did not pass validation");
            valid = false;
        }

        if (valid)
        {
            PersonDAO.addPerson(fromJson);
            System.out.println("It worked");
        }

        out.println("Object test: "+fromJson.getFirst());
        System.out.println("Hello World 5");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}
