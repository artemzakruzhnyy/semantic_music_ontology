package by.epam.training.controllers;

import by.epam.training.services.jena.JenaWorker;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GenreServlet extends HttpServlet {
    private JenaWorker jenaWorker;

    @Override
    public void init() throws ServletException {
        jenaWorker = (JenaWorker) getServletContext().getAttribute("jena");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String musician = req.getParameter("getMusician");
        String bands = req.getParameter("getBands");
        String albums = req.getParameter("getAlbums");
        String performance = req.getParameter("getPerformance");
        String briefInfo = req.getParameter("getBriefInfo");
        String genreName;
        for (Cookie cookie : req.getCookies()) {
            if (cookie.getName().equals("genre")) {
                genreName = cookie.getValue();
                jenaWorker.setSubject(genreName);
            }
        }
        if("1".equals(musician)){
            resp.getWriter().print(jenaWorker.selectLabel("hasMusician"));
        }
        if("1".equals(bands)){
            resp.getWriter().print(jenaWorker.selectLabel("hasBand"));
        }
        if("1".equals(albums)){
            resp.getWriter().print(jenaWorker.selectLabel("hasWork"));
        }
        if("1".equals(performance)){
            resp.getWriter().print(jenaWorker.selectLabel("hasPerformance"));
        }
        if ("1".equals(briefInfo)) {
            resp.getWriter().print(jenaWorker.selectBriefInfoOfGenre());
        }
    }

}
