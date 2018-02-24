package by.epam.training.controllers;

import by.epam.training.services.jena.JenaWorker;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class InstrumentServlet extends HttpServlet{
    private JenaWorker jenaWorker;

    @Override
    public void init() throws ServletException {
        jenaWorker = (JenaWorker) getServletContext().getAttribute("jena");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String musician = req.getParameter("getMusician");
        String briefInfo = req.getParameter("getBriefInfo");
        String instrumentName;
        for (Cookie cookie : req.getCookies()) {
            if (cookie.getName().equals("instrument")) {
                instrumentName = cookie.getValue();
                jenaWorker.setSubject(instrumentName);
            }
        }
        if ("1".equals(briefInfo)) {
            resp.getWriter().print(jenaWorker.selectBriefInfoOfInstrument());
        }
        if ("1".equals(musician)) {
            resp.getWriter().print(jenaWorker.selectLabel("isInstrumentOf"));
        }
    }
}
