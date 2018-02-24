package by.epam.training;

import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;

import java.io.*;

public class Runner {
    public static void main(String[] args) throws IOException {

// Open the bloggers RDF graph from the filesystem
        InputStream in = new FileInputStream(new File("D:\\music.owl"));

// Create an empty in-memory model and populate it from the graph
        Model model = ModelFactory.createMemModelMaker().createModel("music");
        model.read(in, null); // null base URI, since model URIs are absolute
        in.close();

// Create a new query
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT ?label WHERE {" +
                "?entity rdf:type ?type;" +
                "rdfs:label ?label." +
                "FILTER ( lang(?label) = \"en\" )" +
                "?type rdfs:subClassOf* music:Band.}";

        Query query = QueryFactory.create(queryString);

// Execute the query and obtain results
        QueryExecution qe = QueryExecutionFactory.create(query, model);
        ResultSet results = qe.execSelect();

// Output query results
        ResultSetFormatter.out(System.out, results, query);

// Important - free up resources used running the query
        qe.close();


       /* String serviceUri = "http://localhost:3030/ds";
        // uploadRDF(new File("D:\\music.owl"), serviceUri);
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT ?label WHERE {" +
                "?entity rdf:type ?type;" +
                "rdfs:label ?label." +
                "FILTER ( lang(?label) = \"en\" )" +
                "?type rdfs:subClassOf* music:Genre.}";
        String query1 = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT ?label WHERE {" +
                "?entity rdf:type ?type;" +
                "rdfs:label ?label." +
                "FILTER ( lang(?label) = \"en\" )" +
                "?type rdfs:subClassOf* music:Instruments.}";
        execSelectAndPrint(serviceUri, query);

        execSelectAndPrint(serviceUri, query1);
        execSelectAndPrint(serviceUri, query);
        execSelectAndPrint(serviceUri, query);
        execSelectAndPrint(serviceUri, query);
        execSelectAndPrint(serviceUri, query);

        execSelectAndPrint(serviceUri, query);

        //execSelectAndProcess(serviceUri,query);*/
    }

    public static void uploadRDF(File rdf, String serviceURI)
            throws IOException {
        // parse the file
        Model m = ModelFactory.createDefaultModel();
        try (FileInputStream in = new FileInputStream(rdf)) {
            m.read(in, null, "RDF/XML");
        }
        // upload the resulting model
        DatasetAccessor accessor = DatasetAccessorFactory
                .createHTTP(serviceURI);
        accessor.putModel(m);
    }

    public static void execSelectAndPrint(String serviceURI, String query) {
        QueryExecution q = QueryExecutionFactory.sparqlService(serviceURI,
                query);
        ResultSet results = q.execSelect();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ResultSetFormatter.outputAsJSON(outputStream, results);
        String json = outputStream.toString();
        System.out.println(json);
        q.close();

        /*while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            RDFNode x = soln.get("x");
            System.out.println(x);
        }*/
    }

//    public static void execSelectAndProcess(String serviceURI, String query) {
//        QueryExecution q = QueryExecutionFactory.sparqlService(serviceURI,
//                query);
//        ResultSet results = q.execSelect();
//
//        /*while (results.hasNext()) {
//            QuerySolution soln = results.nextSolution();
//            // assumes that you have an "?x" in your query
//            RDFNode x = soln.get("x");
//            System.out.println(x);
//        }*/
//    }
}


