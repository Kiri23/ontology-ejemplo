# ontology-ejemplo: tu dominio en una carpeta

Este repo declara un dominio chico, las plantas de una casa, y con eso tiene su propio grafo. Lo arma
[ontologyLearning](https://github.com/Kiri23/ontologyLearning), el motor: lee la carpeta `ontologia/`, valida los datos
con SHACL y los sirve por CLI y por MCP. No hay que tocar el motor.

El dominio se escribe en TypeScript, en tres archivos que se leen de corrido. De ellos salen los archivos que lee el
motor (Turtle y SHACL), que no hace falta escribir ni leer a mano.

Lo que escribís vos:

| Archivo | Qué es |
|---|---|
| `planta.modelo.ts` | qué es una planta y qué se le exige: un nombre, un riego de 1 día o más, una luz de tres posibles |
| `plantas.ts` | los datos: cinco plantas |
| `dominio.ts` | el jardín entero: nombra el modelo, la consulta y las plantas. Es el archivo que se corre para generar |
| `ontologia/riego.rq` | una consulta, escrita a mano: las plantas que se riegan cada `dias` días o más seguido |

Lo que se genera (no se edita):

| Archivo | Sale de |
|---|---|
| `ontologia/planta.ttl` | `planta.modelo.ts`: la clase `jardin:Planta` y sus propiedades |
| `ontologia/planta-reglas.ttl` | `planta.modelo.ts`: las reglas SHACL |
| `plantas/plantas.ttl` | `plantas.ts` |

Y lo demás:

| Archivo | Qué es |
|---|---|
| `deno.json` | de dónde se importa la librería y las tareas `generar` y `check` |
| `raices.json` | le dice al motor que este repo es la única raíz del grafo |
| `docs/` | el sitio de este repo: una portada y estos archivos tal cual, para GitHub Pages |
| `armar-docs.sh` | rearma `docs/_catalogo/` después de cambiar un archivo de arriba (`--check` solo revisa) |

`grafo/` aparece cuando corrés el motor y no se versiona.

## Así se ve el dominio

El modelo, en `planta.modelo.ts`. Cada propiedad se declara una vez y sale en la clase y en sus reglas:

```ts
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

Una planta, en `plantas.ts`. Los métodos salen del modelo: `.luz("mucha")` no compila.

```ts
Planta.create("pothos").nombre("pothos").riegoCadaDias(7).luz("media"),
```

Y el jardín, en `dominio.ts`:

```ts
const jardin = Domain.create("jardin").at(import.meta)
  .namespace("https://github.com/Kiri23/ontology-ejemplo/jardin#")
  .model(Planta)
  .query("riego")
  .instances(plantas).in("plantas/plantas.ttl");
```

Después de cambiar un `.ts`:

```sh
deno task generar   # escribe los .ttl
deno task check     # sale con 1 si algún .ttl quedó atrasado
```

La librería es [`@kiri23/ontology-client`](https://github.com/Kiri23/ontology-client), entrada `model`. Mientras su
versión 0.6.0 no esté publicada en JSR, `deno.json` la importa de GitHub, fijada a un commit.

## Lo que necesitás

- [Deno](https://deno.com), para generar. Los `.ttl` generados están en el repo: para solo correr el motor no hace falta.
- Python 3.11.
- Un checkout de ontologyLearning. Hoy es un repo privado: sin acceso, esta guía se lee pero no se corre.

## 1. Clonar los dos repos

Lado a lado:

```sh
git clone https://github.com/Kiri23/ontology-ejemplo.git
git clone https://github.com/Kiri23/ontologyLearning.git
cd ontologyLearning
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
```

## 2. Apuntar el motor a este repo

Todos los comandos se corren desde `ontologyLearning/`. Tres variables eligen el grafo:

```sh
E=../ontology-ejemplo
export ONTOLOGY_RAICES=$E/raices.json   # qué repos entran: solo este
export ONTOLOGY_SALIDA=$E/grafo         # dónde se escribe el grafo
export ONTOLOGY_SIN_DOMAIN=1            # sin el dominio propio del motor: solo tus clases
```

Sin el dominio propio, la salida es obligatoria: sin `ONTOLOGY_SALIDA`, el motor sale con exit 2 en vez de leer su
propio `generado/`.

Las tres también existen como flags, antes del comando:
`main.py cli --raices $E/raices.json --salida $E/grafo --sin-domain list jardin:Planta`.

## 3. Armar el grafo

`instancias` junta los `.ttl` del repo que tienen plantas, los valida contra `planta-reglas.ttl` y escribe el grafo:

```
$ .venv/bin/python main.py cli instancias
…/ontology-ejemplo/grafo/instancias.trig: 0 vocabularios, 0 proyectos, 1 con instancias de las ontologia/ de las raíces, 1 grafos, SHACL conforma
```

Si una planta no cumple las reglas, no se escribe nada y el reporte dice cuál y por qué. Con una luz `"mucha"`:

```
Focus Node: planta:cactus
Value Node: Literal("mucha")
Message: La luz de una planta es "sol", "media" o "sombra".
no escribí …/ontology-ejemplo/grafo/instancias.trig
```

## 4. Preguntarle al grafo

`describe` muestra qué clases hay. Sin el dominio del motor, solo la tuya:

```
$ .venv/bin/python main.py cli describe
{
  "clases": [
    {
      "clase": "jardin:Planta",
      "iri": "https://github.com/Kiri23/ontology-ejemplo/jardin#Planta",
      "comentario": "Una planta de la casa: cómo se llama, cada cuántos días se riega y cuánta luz quiere."
    }
  ]
}
```

`describe jardin:Planta` da la clase entera: sus propiedades con su rango, su shape y el próximo paso
(`"call": "list jardin:Planta"`).

`list` da las instancias de una clase:

```
$ .venv/bin/python main.py cli list jardin:Planta
[
  { "iri": "https://github.com/Kiri23/ontology-ejemplo/planta/albahaca", "etiqueta": "albahaca" },
  { "iri": "https://github.com/Kiri23/ontology-ejemplo/planta/aloe", "etiqueta": "aloe" },
  { "iri": "https://github.com/Kiri23/ontology-ejemplo/planta/helecho", "etiqueta": "helecho" },
  { "iri": "https://github.com/Kiri23/ontology-ejemplo/planta/pothos", "etiqueta": "pothos" },
  { "iri": "https://github.com/Kiri23/ontology-ejemplo/planta/sansevieria", "etiqueta": "sansevieria" }
]
```

`get` da una con todos sus datos:

```
$ .venv/bin/python main.py cli get https://github.com/Kiri23/ontology-ejemplo/planta/pothos
{
  "iri": "https://github.com/Kiri23/ontology-ejemplo/planta/pothos",
  "propiedades": {
    "rdf:type": [ "https://github.com/Kiri23/ontology-ejemplo/jardin#Planta" ],
    "rdfs:label": [ "pothos" ],
    "jardin:luz": [ "media" ],
    "jardin:riegoCadaDias": [ 7 ]
  }
}
```

`query` corre una consulta de `ontologia/` por su nombre. `?_dias` en el `.rq` es un parámetro obligatorio, y se
pasa como `dias=3`:

```
$ .venv/bin/python main.py cli query riego dias=3
[
  { "planta": "https://github.com/Kiri23/ontology-ejemplo/planta/albahaca", "nombre": "albahaca", "riegoCadaDias": 2, "luz": "sol" },
  { "planta": "https://github.com/Kiri23/ontology-ejemplo/planta/helecho", "nombre": "helecho", "riegoCadaDias": 3, "luz": "sombra" }
]
```

La salida de la CLI sale en varias líneas; acá está compactada para que se lea.

## 5. Lo mismo desde un agente, por MCP

El MCP ofrece los mismos cuatro comandos como tools: `describe`, `list`, `get` y `query`. Cada tool corre la CLI con
las variables del paso 2, así que lee el mismo grafo. Necesita el paquete `mcp` y un token, cualquier texto:

```sh
.venv/bin/pip install -r requirements-mcp.txt
export ONTOLOGY_MCP_TOKEN=un-token-local
.venv/bin/python main.py mcp --puerto 8802
```

```
http://127.0.0.1:8802/mcp  ·  describe · get · list · query  ·  Bearer ONTOLOGY_MCP_TOKEN
```

Desde otra terminal, registralo en Claude Code:

```sh
claude mcp add --transport http jardin http://127.0.0.1:8802/mcp --header "Authorization: Bearer un-token-local"
```

Pedirle "¿qué plantas riego cada 3 días o menos?" termina en el tool `query` con `{"consulta": "riego", "filtros":
{"dias": "3"}}`, que devuelve lo mismo que el paso 4: albahaca y helecho.

La web del motor (`main.py web`) no arranca con `ONTOLOGY_SIN_DOMAIN`: sus rutas son del dominio propio del motor.

## Sumar lo tuyo

- **Otra planta:** una línea más en `plantas.ts`, `deno task generar` e `instancias` otra vez.
- **Otra clase:** un `<clase>.modelo.ts` como el de Planta, y sumarla en `dominio.ts` con `.model(Planta, Otra)`. Al
  generar salen `ontologia/<clase>.ttl` y `ontologia/<clase>-reglas.ttl`.
- **Otra consulta:** un `.rq` en `ontologia/`, a mano, y nombrarla en `dominio.ts` con `.query("riego", "otra")`. Su
  nombre de archivo es el nombre con el que la llamás.

También se puede sin TypeScript: el motor solo lee los `.ttl` y los `.rq`, y no le importa quién los escribió.

Usá tu propio espacio de nombres, como `jardin:` acá. Las reglas completas de qué va en `ontologia/` están en
`docs/dominio-de-afuera.md` de ontologyLearning.

## Para qué sirve

ontologyLearning la usa con un `tests/test_ejemplo.py` que corre esta guía de punta a punta contra una copia fijada a un
commit de este repo. Si un cambio en el motor rompe los dominios de afuera, esa prueba falla.
