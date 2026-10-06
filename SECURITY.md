# Política de seguridad — GestionAPI_01_Node.js

## Estado

Este repositorio es un proyecto académico de API REST con Node.js, Express, MongoDB y JWT.

## Reglas de seguridad

- No se deben publicar archivos `.env`, contraseñas, secretos JWT ni cadenas de conexión con credenciales.
- `JWT_SECRET` y `MONGO_URI` deben configurarse mediante variables de entorno.
- El secreto JWT publicado en una versión anterior del repositorio se considera comprometido y no debe reutilizarse.
- Las credenciales de prueba deben limitarse al entorno local y no utilizarse en producción.
- Los cambios de seguridad deben pasar por revisión antes de llegar a `main`.

## Reporte de vulnerabilidades

No publiques secretos, tokens ni datos personales en issues públicas. Para una vulnerabilidad que pueda afectar a usuarios reales, contacta al mantenedor mediante el correo asociado al perfil de GitHub y proporciona pasos mínimos para reproducirla.

## Alcance de esta fase

La Fase 1 cubre saneamiento del árbol actual, exclusión de secretos y archivos generados, endurecimiento de JWT y automatización básica de seguridad.

La limpieza completa del historial Git de secretos publicados requiere una reescritura controlada de la historia y se mantiene como tarea pendiente hasta realizarla localmente.
