// Este archivo puede ser reemplazado durante la compilación usando el array `fileReplacements`.
// `ng build` reemplaza `environment.ts` por `environment.prod.ts`.
// La lista de archivos de reemplazo se puede encontrar en `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api' // Dirección del backend local
};


/*
 * Para facilitar la depuración en modo desarrollo, puedes importar el siguiente archivo
 * para ignorar los errores relacionados con zone, como `zone.run` o `zoneDelegate.invokeTask`.
 *
 * Esta importación debe estar comentada en modo producción porque puede afectar negativamente
 * el rendimiento si se lanza un error.
 */
// import 'zone.js/plugins/zone-error';  // Incluido con Angular CLI.
