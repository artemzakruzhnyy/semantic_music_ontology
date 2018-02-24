package by.epam.training.controllers;

import by.epam.training.services.jena.JenaWorker;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class PerformanceServlet extends HttpServlet {
    private JenaWorker jenaWorker;

    @Override
    public void init() throws ServletException {
        jenaWorker = (JenaWorker) getServletContext().getAttribute("jena");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String genre = req.getParameter("getGenre");
        String band = req.getParameter("getBand");
        String briefInfo = req.getParameter("getBriefInfo");
        String performanceName;
        for (Cookie cookie : req.getCookies()) {
            if (cookie.getName().equals("performance")) {
                performanceName = cookie.getValue();
                jenaWorker.setSubject(performanceName);
            }
        }
        if ("1".equals(briefInfo)) {
            resp.getWriter().print(jenaWorker.selectBriefInfoOfPerformance());
        }
        if ("1".equals(genre)) {
            resp.getWriter().print(jenaWorker.selectLabel("hasGenre"));
        }
        if ("1".equals(band)) {
            resp.getWriter().print(jenaWorker.selectLabel("performedBy"));
        }
    }
}
