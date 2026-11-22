// Las plantas de la casa. De acá sale plantas/plantas.ttl.
import { Planta } from "./planta.modelo.ts";

export const plantas = [
  Planta.withId("albahaca").nombre("albahaca").riegoCadaDias(2).luz("sol"),
  Planta.withId("helecho").nombre("helecho").riegoCadaDias(3).luz("sombra"),
  Planta.withId("pothos").nombre("pothos").riegoCadaDias(7).luz("media"),
  Planta.withId("sansevieria").nombre("sansevieria").riegoCadaDias(14).luz("sombra"),
  Planta.withId("aloe").nombre("aloe").riegoCadaDias(21).luz("sol"),
];
