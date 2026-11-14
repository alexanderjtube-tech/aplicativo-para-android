# AIC · Circuito Córdoba

Primera maqueta navegable de la aplicación de administración de la Asamblea de Iglesias Cristianas (AIC), Circuito Córdoba.

## Abrir

Abre `index.html` en un navegador para explorar la interfaz. La vista de demostración permite entrar como Presbítero, Tesorero, Secretario, Pastor, Maestro ITAIC o Administrador ITAIC. Para instalarla como aplicación web en Android, sirve esta carpeta por HTTPS y usa la opción **Instalar aplicación** del navegador.

## Alcance de esta versión

- Inicio de sesión de demostración con selector de rol; no valida credenciales.
- Navegación en español e inglés.
- Vistas de iglesias, finanzas, secretaría, ITAIC, pastores y maestros.
- El Administrador ITAIC puede consultar toda la información, asignar maestros, aprobar solicitudes de matrícula y generar informes; no edita nombres, notas ni pagos de estudiantes. El Presbítero consulta la información del Instituto sin modificarla.
- El pastor solicita la matrícula de un miembro de su iglesia, con año y sede deseados. La solicitud queda pendiente hasta que el Administrador ITAIC la aprueba; al aprobarse, el estudiante se agrega al grupo correspondiente.
- Los maestros ven únicamente los cursos que tienen asignados, agregan evaluaciones con un porcentaje de la nota final, cargan calificaciones de 0 a 5 y registran abonos de esos estudiantes. El tablero calcula la contribución ponderada y el porcentaje evaluado por estudiante.
- El panel del maestro se limita a sus cursos, estudiantes asignados, notas y saldos de pago de esos estudiantes. El panel pastoral muestra únicamente los indicadores de la iglesia local y permite configurar los rangos de edad para clasificar a sus miembros.
- El panel ITAIC es de consulta; permite revisar matrículas, notas, maestros, sedes y pagos, y generar informes. El panel pastoral permite ajustar los límites de niños, juveniles y jóvenes; clasifica a los adultos por sexo y estado civil.
- El Administrador ITAIC revisa las notas por curso y los pagos de todos los estudiantes. Los maestros pueden generar informes de la sede asignada; los informes del Administrador ITAIC admiten un consolidado general o una sede.
- Los movimientos de las iglesias usan rubros unificados: diezmos, ofrendas, primicias, actividades y otros para ingresos; diezmo de diezmos, diezmo de ofrendas, servicios públicos, pago pastor, remodelación, implementos de limpieza, muebles, compra de equipos y mantenimiento de equipos para egresos. Actividades y otros requieren descripción.
- Los informes financieros pastorales detallan saldo inicial, movimientos y subtotales por rubro, totales de ingresos y egresos y saldo final calculado. El informe del Tesorero consolida los rubros de todas las iglesias.
- Los informes incluyen el logo y membrete de la AIC y del Circuito Córdoba; agregan el nombre de la iglesia para informes pastorales, e identifican ITAIC o la sede sin mostrar una iglesia. Se exportan como Excel compatible (.xls), Word editable (.doc) y mediante la opción de impresión/guardar como PDF del navegador.
- La vista previa de los informes aparece como documento organizado dentro de una ventana propia. Las acciones de generar o exportar ofrecen las tres opciones de salida.
- Formularios demostrativos para registrar miembros, movimientos e iglesias.
- Exportación CSV compatible con Excel e impresión desde el navegador para guardar como PDF.
- Diseño adaptable a móvil y escritorio, con manifiesto instalable.

Los registros y cifras visibles son datos ficticios de muestra y viven en la sesión del navegador. No hay todavía base de datos, sincronización, autenticación segura ni permisos de servidor. Las exportaciones Excel y Word son documentos editables generados por el navegador; la creación de PDF abre el diálogo de impresión para elegir **Guardar como PDF**. Estos componentes deben conectarse a servicios persistentes antes de usar la aplicación con datos reales. La interfaz oculta módulos según el rol para demostrar el flujo; la seguridad real deberá imponerse también en el servidor.
