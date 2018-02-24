package by.epam.training.controllers;

import by.epam.training.services.jena.JenaWorker;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MusicianServlet extends HttpServlet {
    private JenaWorker jenaWorker;

    @Override
    public void init() throws ServletException {
        jenaWorker = (JenaWorker) getServletContext().getAttribute("jena");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String album = req.getParameter("getAlbums");
        String band = req.getParameter("getBand");
        String instrument = req.getParameter("getInstrument");
        String genre = req.getParameter("getGenre");
        String briefInfo = req.getParameter("getBriefInfo");
        String musicianName;
        for (Cookie cookie : req.getCookies()) {
            if (cookie.getName().equals("musician")) {
                musicianName = cookie.getValue();
                jenaWorker.setSubject(musicianName);
            }
        }
        if ("1".equals(briefInfo)) {
            resp.getWriter().print(jenaWorker.selectBriefInfoOfMusician());
        }
        if ("1".equals(album)) {
            resp.getWriter().print(jenaWorker.selectLabel("hasAlbum"));
        }
        if ("1".equals(band)) {
            resp.getWriter().print(jenaWorker.selectLabel("memberOf"));
        }
        if ("1".equals(instrument)) {
            resp.getWriter().print(jenaWorker.selectLabel("playOn"));
        }
        if ("1".equals(genre)) {
            resp.getWriter().print(jenaWorker.selectLabel("hasGenre"));
        }
    }
}
