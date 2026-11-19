# ontology-ejemplo

Un dominio chico, las plantas de una casa, declarado en una carpeta. Con eso el repo tiene su propio
grafo: lo arma [ontologyLearning](https://github.com/Kiri23/ontologyLearning), el motor, sin tocarlo.

**El tutorial** es el [README del repo](https://github.com/Kiri23/ontology-ejemplo#readme): clonar,
apuntar el motor a este repo, armar el grafo y preguntarle.

Acá están los archivos que el tutorial usa, tal cual:

| Archivo | Qué es |
|---|---|
| [`ontologia/planta.ttl`](/_catalogo/ontologia/planta.ttl.md) | la clase `jardin:Planta` y sus propiedades |
| [`ontologia/planta-reglas.ttl`](/_catalogo/ontologia/planta-reglas.ttl.md) | lo que toda planta cumple (SHACL) |
| [`ontologia/riego.rq`](/_catalogo/ontologia/riego.rq.md) | la consulta: qué plantas se riegan cada `dias` días o más seguido |
| [`plantas/plantas.ttl`](/_catalogo/plantas/plantas.ttl.md) | los datos: cinco plantas |
| [`raices.json`](/_catalogo/raices.json.md) | le dice al motor que este repo es la única raíz del grafo |

La lista entera, con su menú, está en el [catálogo](/_catalogo/README.md).
