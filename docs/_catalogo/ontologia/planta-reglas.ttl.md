# ontologia/planta-reglas.ttl

```turtle
# Generated from dominio.ts by @kiri23/ontology-client/model. Edit the .ts, not this file.
@prefix jardin: <https://github.com/Kiri23/ontology-ejemplo/jardin#>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix sh: <http://www.w3.org/ns/shacl#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

jardin:PlantaShape a sh:NodeShape;
    sh:targetClass jardin:Planta;
    sh:property [
      sh:path rdfs:label;
      sh:name "nombre";
      sh:datatype xsd:string;
      sh:minCount 1;
      sh:maxCount 1;
      sh:message "Una planta tiene exactamente un nombre (rdfs:label)."
    ], [
      sh:path jardin:riegoCadaDias;
      sh:name "riego cada días";
      sh:datatype xsd:integer;
      sh:minCount 1;
      sh:maxCount 1;
      sh:message "Una planta se riega cada 1 día o más (jardin:riegoCadaDias, un entero).";
      sh:minInclusive 1
    ], [
      sh:path jardin:luz;
      sh:name "luz";
      sh:minCount 1;
      sh:maxCount 1;
      sh:message "La luz de una planta es \"sol\", \"media\" o \"sombra\".";
      sh:in ("sol" "media" "sombra")
    ].
```
