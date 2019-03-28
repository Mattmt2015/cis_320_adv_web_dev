package edu.simpson.taylor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

@WebServlet(name = "GetCookieServlet")
public class GetCookieServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // --- Cookies ---
        // Get all the cookies
        Cookie [] cookies = request.getCookies();

        // Print how many cookies we have
        out.println(String.format("%d cookies:", cookies.length));

        // Print all the cookies
        for(Cookie cookie: cookies) {
            out.println(String.format("  %s = %s",cookie.getName(), cookie.getValue()));
            out.println(String.format("    Domain  = %s",cookie.getDomain()));
            out.println(String.format("    Path    = %s",cookie.getPath()));
            out.println(String.format("    MaxAge  = %s",cookie.getMaxAge()));
            out.println(String.format("    Secure? = %s",cookie.getSecure()));
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}