# plantas.ts

```ts
// Las plantas de la casa. De acá sale plantas/plantas.ttl.
import { Planta } from "./planta.modelo.ts";

export const plantas = [
  Planta.create("albahaca").nombre("albahaca").riegoCadaDias(2).luz("sol"),
  Planta.create("helecho").nombre("helecho").riegoCadaDias(3).luz("sombra"),
  Planta.create("pothos").nombre("pothos").riegoCadaDias(7).luz("media"),
  Planta.create("sansevieria").nombre("sansevieria").riegoCadaDias(14).luz("sombra"),
  Planta.create("aloe").nombre("aloe").riegoCadaDias(21).luz("sol"),
];
```
