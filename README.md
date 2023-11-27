# Movie Challenge con Angular

## Índice

- [1. Resumen del proyecto](#1-resumen-del-proyecto)
- [2. Historias de Usuario](#2-historias-de-usuario)
- [3. Prototipos](#3-prototipos)

---

## 1. Resumen del proyecto

En este proyecto, crearás una página web destinada a visualizar, filtrar y
ordenar el catálogo de películas de
[_The Movie Database API V3_](https://developer.themoviedb.org/docs).
Esta página puede servir como un catálogo de
películas general, pero también, si te animas,
puedes considerar la posibilidad de diseñarla
para un público y usuarias específicas
con preferencias como "películas western"
o "películas de las 80's" por ejemplo.

Para implementar este proyecto deberás elegir un framework entre
[React](https://reactjs.org/) y [Angular](https://angular.io/).
Al elegir un _framework_ o _librería_ para nuestra interfaz, nos apoyamos en una
serie de convenciones e implementaciones _probadas_ y _documentadas_ para
resolver un problema común a toda interfaz web:
[_mantener la interfaz sincronizada con el estado_](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445).
Esto nos permite concentrarnos mejor (dedicar más tiempo) en las
características _específicas_ de nuestra aplicación.

Cuando elegimos una de estas tecnologías no solo importamos un pedacito de
código para reusarlo (lo cuál es un gran valor per se), si no que adoptamos una
**arquitectura**, una serie de **principios de diseño**, un **paradigma**, unas
**abstracciones**, un **vocabulario**, una **comunidad**, etc...

Como desarrolladora Front-end, estos kits de desarrollo pueden resultarte
de gran ayuda para implementar rápidamente características de los proyectos en
los que trabajes.

## 2. Historias de Usuario

### [Historia de Usuario 1] - Lista de Películas

#### Descripción

Yo como usuaria quiero visualizar en un tabla (filas y columnas) el catálogo de películas.

#### Criterios de Aceptación

- Al visitar la aplicación deployada se visualizará en una tabla (filas y columnas) el catálogo de las películas más populares de The Movie Database API V3.
- La usuaria puede ver la información relevante de cada pelícla (título y año de lanzamiento).

#### Definición de terminado

- La funcionalidad cumple satisface los criterios de aceptación.
- La funcionalidad tiene test unitarios.
- El diseño visual corresponde al prototipo de alta fidelidad.
- El código de esta funcionalidad recibió code review.

### [Historia de Usuario 2] - Paginación de Lista de Películas

#### Descripción

Yo como usuaria quiero navegar el catálogo de películas dividido por páginas.

#### Criterios de Aceptación

- Al visitar la aplicación deployada se visualizará el catálogo de las películas divido por páginas.
- Se podrá avanzar y retroceder para visualizar los resultado usando flechas de navegación en la UI.

#### Definición de terminado

- La funcionalidad cumple satisface los criterios de aceptación.
- La funcionalidad tiene test unitarios.
- El diseño visual corresponde al prototipo de alta fidelidad.
- El código de esta funcionalidad recibió code review.

#### [Historia de usuario 3] Filtro y ordenamiento

Yo como usuaria quiero filtrar y ordenar el catálogo de películas usando
los criterios soportados por _TheMovie Database API V3_

##### Criterios de aceptación

- Para filtrar se debe usar el _endpoint_
  [/discover/movie](https://developer.themoviedb.org/reference/discover-movie),
  y alguno de sus parámetros como por ejemplo _with_genres_.
- Para ordenar se debe usar el _endpoint_
  [/discover/movie](https://developer.themoviedb.org/reference/discover-movie),
  y alguno de sus parámetros como por ejemplo _sort_by_.
- La paginación debe conservar el filtro y ordenamiento
- Para cada película se debe mostrar como mínimo:
  poster, título original y año de lanzamiento.

##### Definición de terminado

- Los componentes desarrollados deben contar con test unitarios.

---

#### [Historia de usuario 4] Detalle de una película

Yo como usuaria quiero consultar los detalles de una película

##### Criterios de aceptación

- Se debe usar el _endpoint_
  [/movie/{movie_id}](https://developer.themoviedb.org/reference/movie-details).
- Para la película se debe mostrar como mínimo: poster, título original,
  año de lanzamiento, géneros, promedio de votación y total de votos.
- La interfaz debe permitir retornar al listado de películas conservando
  el filtro y ordenamiento.

##### Definición de terminado

- Los componentes desarrollados deben contar con test unitarios.

---

## 3. Prototipos

### Desktop

![Image](https://github.com/suckak/movie-challenge-angular/assets/5282075/49453f0a-e23e-4d9c-8b3a-f2d2b8aa9979)

![Image](https://github.com/suckak/movie-challenge-angular/assets/5282075/9b251220-4b52-42ee-b81f-62c615a59478)
