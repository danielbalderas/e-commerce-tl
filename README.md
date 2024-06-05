<h1>Detalles del proyecto</h1>
El proyecto está construido en Ionic VUEJS, se tomo la decisión de utilizar este framework debido a la facilidad que que encontré y tomando en cuenta el tiempo que se tiene para este challenge, cabe mencionar que existen opciones más robustas que pueden mejorar el desarrollo del proyecto.
Para este challenge algunos de los requisitos no han sido completados los cuales son:
<lu>
  <li>Almacenamiento local</li>
  <li>Notificaciones push</li>
  <li>Demostración en iOS (Este debido a la falta del entorno de Xcode)</li>
</lu>

<h1>Instalación</h1>
<lu>
  <li>Descargar el proyecto de este repositorio</li>
  <li>Verificar que se tiene instalado Ionic en el ordenador, para mayor información: https://ionicframework.com/docs/intro/cli</li>
  <li>Instalar VueJs con el comando: npm install @ionic/vue @ionic/vue-router</li>
  <li>Instalar Vite con el comando: npm install -D vite-plugin-pwa (este plugin es el que convierte el proyecto en una PWA y se tiene como dependencia dentro del proyecto)</li>
  <li>Instalar Capacitor con los comandos: npm i @capacitor/core y npm i -D @capacitor/cli</li>
</lu>

<h1>Ejecución Web</h1>
<lu>
  <li>Revisar que se tenga levantado el servidor NodeJs, seguir las instrucciones del repositorio: https://github.com/occmundial/local-shop-api</li>
  <li>En terminal posicionarnos en la carpeta de la solución del proyecto y correr el comando: ionic serve</li>
  <li>Una vez que el comando se ejecute se correrá el proyecto de manera local</li>
</lu>

<h1>Ejecución Android</h1>
<lu>
  <li>Revisar que se tenga levantado el servidor NodeJs, seguir las instrucciones del repositorio: https://github.com/occmundial/local-shop-api</li>
  <li>En el proyecto cambiar las url: localhost:3000 por la ip de la maquina donde se está corriendo el proyecto (para este punto verificar que el emulador o dispositivo físico esten conectadas a la misma red de internet)</li>
  <li>Abrir una terminal e ir a la carpeta del proyecto y ejecutar el comando: ionic build</li>
  <li>Ejecutar el comando: npx cap copy && npx cap sync</li>
  <li>Verificar que se tiene instalado android studio y abrir el proyecto con el siguiente comando: npx cap open android</li>
  <li>Una vez dentro de visual studio correr la aplicación en el emulador o dispositivo físico</li>
</lu>

<h1>Decisiones del diseño</h1>
Se utiliza un proyecto de tipo tabs, estas tabs hacen referencia a dos vistas una de ellas es para la consulta del listado de productos y el otro para la revisión del carrito.
Las funcionalidades generales que se tienen en el proyecto son:
<lu>
  <li>Mostrar productos</li>
  <li>Filtrado de productos por texto y categoría</li>
  <li>Manejo simple de excepciones</li>
  <li>Toast (alerta para notificar al usuario algún detalle)</li>
  <li>Flujo del carrito (agregar elemento, eliminación de elementos)</li>
  <li>Estado de conexión (online, offline)</li>
  <li>Paginación de productos (aquí tome la decisión de implementar un scroll infinito, desde mi punto de vista y viendo el enfoque mobile hoy en día es muy común que los listados lleven este tipo de funcionalidad)</li>
</lu>

Entiendo que la parte de UX/UI no ha sido ni cerca la mejor, pero la parte de demostrar la funcionalidad del listado anterior fue a la que se le da prioridad de momento.
