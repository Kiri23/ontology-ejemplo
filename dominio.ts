// El jardín entero: qué clases tiene, qué consultas y qué plantas. Es el archivo que se corre para generar.
import { Domain } from "@kiri23/ontology-client/model";
import { Planta } from "./planta.modelo.ts";
import { plantas } from "./plantas.ts";

const jardin = Domain.create("jardin").at(import.meta)
  .namespace("https://github.com/Kiri23/ontology-ejemplo/jardin#")
  .model(Planta)
  .query("riego")
  .instances(plantas).in("plantas/plantas.ttl");

if (import.meta.main) Deno.exit(jardin.main(Deno.args));
