package by.epam.training.services.jena;

import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;

import java.io.*;

public class JenaWorker {
    private Model model;
    private String subject;

    public void setSubject(String subject) {
        this.subject = subject;
    }

    private String getSubject() {
        return subject;
    }

    public JenaWorker(FileInputStream fileInputStream) {
        try {
            createModel(fileInputStream);
        } catch (IOException e) {
            throw new IllegalArgumentException("File not exist.", e);
        }
    }

    private void createModel(FileInputStream fileInputStream) throws IOException {
        InputStream in = null;
        try {
            in = fileInputStream;
            model = ModelFactory.createMemModelMaker().createModel("music");
            model.read(in, null);
        } finally {
            if (in != null) {
                in.close();
            }
        }
    }

    private String executeQuery(String queryString) {
        String json;
        Query query = QueryFactory.create(queryString);
        QueryExecution qe = QueryExecutionFactory.create(query, model);
        ResultSet results = qe.execSelect();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ResultSetFormatter.outputAsJSON(outputStream, results);
        json = new String(outputStream.toByteArray());
        System.out.println(json);
        qe.close();
        return json;
    }

    public String selectBands() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT ?label WHERE {" +
                "?entity rdf:type ?type;" +
                "rdfs:label ?label." +
                "FILTER ( lang(?label) = \"en\" )" +
                "?type rdfs:subClassOf* music:Band.}";
        return executeQuery(queryString);
    }


    public String selectBriefInfoOfBand() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT ?creationDate ?city ?country ?language_Of_Songs ?wiki_link WHERE {" +
                "?band rdf:type music:Band. ?band music:creationDate ?creationDate. ?band music:city ?city." +
                "?band music:country ?country. ?band music:language_Of_Songs ?language_Of_Songs. ?band music:wiki_link ?wiki_link" +
                " Filter regex(str(?band), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }


    public String selectBriefInfoOfGenre() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT  ?creationDate ?country ?best_years ?wiki_link WHERE {" +
                "?genre rdf:type music:Genre. ?genre music:creation_date ?creationDate. ?genre music:genreCountry ?country." +
                "?genre music:best_years ?best_years. ?genre music:genre_wiki_link ?wiki_link" +
                " Filter regex(str(?genre), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }


    public String selectLabelAndLink(String predicate) {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT ?label ?uri WHERE {" +
                "?object music:" + predicate + "?subject." +
                "?subject rdfs:label ?label." +
                "?subject music:uri ?uri." +
                "Filter (lang(?label) = \"en\")" +
                "Filter regex(str(?object), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }

    public String selectLabel(String predicate) {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT ?label WHERE {" +
                "?object music:" + predicate + "?subject." +
                "?subject rdfs:label ?label." +
                "Filter (lang(?label) = \"en\")" +
                "Filter regex(str(?object), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }

    public String selectBriefInfoOfAlbum() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT  ?releaseDate  ?durability ?lang ?link WHERE {" +
                "?object rdf:type music:Album. ?object music:releaseDate ?releaseDate. ?object music:durability ?durability." +
                "?object music:lang ?lang. ?object music:album_wiki_link ?link" +
                " Filter regex(str(?object), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }

    public String selectBriefInfoOfMusician() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT  ?firstName  ?secondName ?birthDate ?birthPlace ?gender ?countryMusician ?cityMusician WHERE {" +
                "?object rdf:type music:Musician. ?object music:FirstName ?firstName. ?object music:secondName ?secondName." +
                "?object music:birthDate ?birthDate. ?object music:gender ?gender. ?object music:countryMusician ?countryMusician." +
                "?object music:birthPlace ?birthPlace. ?object music:cityMusician ?cityMusician" +
                " Filter regex(str(?object), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }

    public String selectBriefInfoOfInstrument() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT  ?model  ?brend ?manufacturerCountry ?label WHERE {" +
                "?object rdf:type ?type. ?type rdfs:subClassOf* music:Instruments; rdfs:label ?label. Filter(lang(?label) = \"en\")." +
                "?object music:model ?model. ?object music:brend ?brend. ?object music:manufacturerCountry ?manufacturerCountry." +
                " Filter regex(str(?object), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }


    public String selectBriefInfoOfPerformance() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "prefix music: <http://localhost:8080/artem/ontologies/music#> " +
                "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "SELECT  ?annotation  ?ticketPrice ?date ?label WHERE {" +
                "?object rdf:type ?type. ?type rdfs:subClassOf* music:Performance; rdfs:label ?label. Filter(lang(?label) = \"en\")." +
                "?object music:annotation ?annotation. ?object music:ticketPrice ?ticketPrice. ?object music:date ?date." +
                " Filter regex(str(?object), \"" + getSubject() + "\")}";
        return executeQuery(queryString);
    }
}
