# planta.modelo.ts

```ts
// Qué es una planta y qué se le exige. De acá salen ontologia/planta.ttl y ontologia/planta-reglas.ttl.
import { Model, Shape } from "@kiri23/ontology-client/model";

export class Planta extends Model {
  static shape = Shape.of(Planta)
    .label("Planta")
    .comment("Una planta de la casa: cómo se llama, cada cuántos días se riega y cuánta luz quiere.")
    .instancesIn("https://github.com/Kiri23/ontology-ejemplo/planta/")
    .text("nombre").predicate("rdfs:label").exactly(1)
    .message("Una planta tiene exactamente un nombre (rdfs:label).")
    .integer("riegoCadaDias").name("riego cada días").exactly(1)
    .comment("Cada cuántos días se riega: 7 es una vez por semana.")
    .shacl("sh:minInclusive 1")
    .message("Una planta se riega cada 1 día o más (jardin:riegoCadaDias, un entero).")
    .text("luz").exactly(1).oneOf("sol", "media", "sombra")
    .comment('Cuánta luz quiere: "sol", "media" o "sombra".')
    .message('La luz de una planta es "sol", "media" o "sombra".');
}
```
