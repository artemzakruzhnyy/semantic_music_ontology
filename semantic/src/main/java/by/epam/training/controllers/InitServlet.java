package by.epam.training.controllers;

import by.epam.training.services.jena.JenaWorker;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.jena.base.Sys;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.print.Book;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

public class InitServlet extends HttpServlet {
    private JenaWorker jenaWorker;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        jenaWorker = (JenaWorker) getServletContext().getAttribute("jena");
        System.out.println("get=" + jenaWorker);
        String bands = req.getParameter("getBands");
        if ("1".equals(bands)) {
            if (jenaWorker != null) {
                resp.getWriter().print(jenaWorker.selectBands());
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<FileItem> items = getUploadFiles(req);
        for (FileItem item : items) {
            jenaWorker = new JenaWorker((FileInputStream) item.getInputStream());
            System.out.println("post=" + jenaWorker);
            getServletContext().setAttribute("jena", jenaWorker);
        }
        resp.sendRedirect("index.html");
    }

    private static List<FileItem> getUploadFiles(HttpServletRequest req) throws ServletException {
        try {
            return new ServletFileUpload(new DiskFileItemFactory()).parseRequest(req);
        } catch (FileUploadException e) {
            throw new ServletException("Cannot parse request.", e);
        }
    }
}
