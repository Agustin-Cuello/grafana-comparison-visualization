## Instalación

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Compilar plugin 

   ```bash
   npm run build
   ```

3. Crear instancia de grafana en docker y utilizar el plugin en ella

   ```bash
   npm run server
   ```

Alternativamente, para desarrollo

   ```bash
   docker compose up
   npm run dev
   ```
## Datos

Es necesario proveer un timeseries con una columna llamada "time". Se puede dar el alias "time" a la columna correspondiente al dato del tiempo.

El primer query en grafana es tomado como el set de referencia mientras que el segundo es tomado como el set target.