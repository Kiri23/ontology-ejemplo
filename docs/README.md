# ontology-ejemplo

Un dominio chico, las plantas de una casa, declarado en una carpeta. Con eso el repo tiene su propio
grafo: lo arma [ontologyLearning](https://github.com/Kiri23/ontologyLearning), el motor, sin tocarlo.

**El tutorial** es el [README del repo](https://github.com/Kiri23/ontology-ejemplo#readme): clonar,
apuntar el motor a este repo, armar el grafo y preguntarle.

Acá están los archivos que el tutorial usa, tal cual:

| Archivo | Qué es |
|---|---|
| [`planta.modelo.ts`](/_catalogo/planta.modelo.ts.md) | lo que se escribe: qué es una planta y qué se le exige |
| [`plantas.ts`](/_catalogo/plantas.ts.md) | lo que se escribe: cinco plantas |
| [`dominio.ts`](/_catalogo/dominio.ts.md) | lo que se corre para generar: nombra el modelo, la consulta y las plantas |
| [`ontologia/riego.rq`](/_catalogo/ontologia/riego.rq.md) | la consulta, a mano: qué plantas se riegan cada `dias` días o más seguido |
| [`ontologia/planta.ttl`](/_catalogo/ontologia/planta.ttl.md) | generado: la clase `jardin:Planta` y sus propiedades |
| [`ontologia/planta-reglas.ttl`](/_catalogo/ontologia/planta-reglas.ttl.md) | generado: lo que toda planta cumple (SHACL) |
| [`plantas/plantas.ttl`](/_catalogo/plantas/plantas.ttl.md) | generado: los datos |
| [`raices.json`](/_catalogo/raices.json.md) | le dice al motor que este repo es la única raíz del grafo |

La lista entera, con su menú, está en el [catálogo](/_catalogo/README.md).
