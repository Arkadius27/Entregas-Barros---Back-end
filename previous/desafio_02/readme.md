Consigna
- Programar una clase “ProductManager” que gestione un conjunto de productos con fs.
- Programar una clase “UserManager” que gestione un conjunto de usuarios con fs.

Aspectos a incluir:
Debe crearse una carpeta data donde se guardaran los archivos json de productos/usuarios

Cada producto tiene las propiedades:
id (código identificador)
title (titulo)
photo (ruta de imagen)
price (precio)
stock (unidades disponibles)

Cada usuario tiene las propiedades:
id (código identificador)
name (titulo)
photo (ruta de imagen)
email (precio)

-----------------------------------------------------------------------------------------

Cada clase de contar con los métodos:

create(data) el cual agregará un producto/usuario al arreglo de productos/usuarios del json (todos los campos son obligatorios menos id que debe agregarse automáticamente  y auto-incrementable).

read() el cual debe devolver el arreglo con todos los productos/usuarios del json correspondiente.

readOne(id) el cual debe devolver el objeto producto/usuario buscado del json correspondiente.
