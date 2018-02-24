package by.epam.training.controllers;

import by.epam.training.services.jena.JenaWorker;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class BandServlet extends HttpServlet {
    private JenaWorker jenaWorker;

    @Override
    public void init() throws ServletException {
        jenaWorker = (JenaWorker) getServletContext().getAttribute("jena");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String single = req.getParameter("getSingle");
        String band = req.getParameter("getBand");
        String performance = req.getParameter("getPerformance");
        String albums = req.getParameter("getAlbums");
        String genre = req.getParameter("getGenre");
        String briefInfo = req.getParameter("getBriefInfo");
        String bandName;
        for (Cookie cookie : req.getCookies()) {
            if (cookie.getName().equals("band")) {
                bandName = cookie.getValue();
                jenaWorker.setSubject(bandName);
            }
        }
        if ("1".equals(briefInfo)) {
            resp.getWriter().print(jenaWorker.selectBriefInfoOfBand());
        }
        if ("1".equals(single)) {
            resp.getWriter().print(jenaWorker.selectLabelAndLink("hasSingle"));
        }
        if ("1".equals(genre)) {
            resp.getWriter().print(jenaWorker.selectLabel("hasGenre"));
        }
        if ("1".equals(albums)) {
            resp.getWriter().print(jenaWorker.selectLabel("hasAlbum"));
        }
        if ("1".equals(band)) {
            resp.getWriter().print(jenaWorker.selectLabel("consistOf"));
        }
        if ("1".equals(performance)) {
            resp.getWriter().print(jenaWorker.selectLabel("takePart"));
        }
    }
}
