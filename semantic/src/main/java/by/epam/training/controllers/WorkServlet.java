package by.epam.training.controllers;

import by.epam.training.services.jena.JenaWorker;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class WorkServlet extends HttpServlet {
    private JenaWorker jenaWorker;

    @Override
    public void init() throws ServletException {
        jenaWorker = (JenaWorker) getServletContext().getAttribute("jena");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String genre = req.getParameter("getGenre");
        String songs = req.getParameter("getSongs");
        String bands = req.getParameter("getBands");
        String briefInfo = req.getParameter("getBriefInfo");
        String albumName;
        for (Cookie cookie : req.getCookies()) {
            if (cookie.getName().equals("album")) {
                albumName = cookie.getValue();
                jenaWorker.setSubject(albumName);
            }
        }
        if ("1".equals(genre)) {
            resp.getWriter().print(jenaWorker.selectLabel("hasGenre"));
        }
        if ("1".equals(bands)) {
            resp.getWriter().print(jenaWorker.selectLabel("isWorkBy"));
        }
        if ("1".equals(songs)) {
            resp.getWriter().print(jenaWorker.selectLabelAndLink("consistOf"));
        }
        if ("1".equals(briefInfo)) {
            resp.getWriter().print(jenaWorker.selectBriefInfoOfAlbum());
        }
    }
}
