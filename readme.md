## JSON WEB TOKENS & Authentication with NodeJS

![postman](./resources/JWTAPI.png)

### Descripción
Una API REST con validaciones, roles y autenticaciones con JWT usando paquetes npm de NodeJS como JSONWEBTOKEN como autenticación para los roles y Bcrypt para hashear las contraseñas.
Puedes probar esta API usando Postman para importar los request.

<div align="center">
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg" title="NodeJS" alt="Node" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg" title="MongoDB" alt="Mongo" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/babel/babel-original.svg" title="BabelJS" alt="Babel" width="40" height="40"/>
<img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" title="Postman" alt="Postman" width="40" height="40"/>
</div>

## Instrucciones

Para Ejecutar el proyecto debes seguir los pasos siguientes:

- Tener REST Client instalado, en este caso POSTMAN

<div align = "center"> 

![postimp](./resources/JWTAPI.png)

</div>

- Ejecutar el comando:

```
 $ npm install
```

- Crear un archivo .env en la raiz del proyecto y agregar las variables PORT, MONGO_URI y SECRET

<div align = "center"> 

![env](./resources/env.png)

</div>

- Ejecutar babel para producción

```
 $ npm run build
```

- Ejecutar el Proyecto


```
 $ npm run start
```

- Importar las request en tu REST Client

<div align = "center"> 

![Import](./resources/Import.png)

</div>

- Importa desde la carpeta "postman" del proyecto

<div align = "center"> 

![POST](./resources/postimp.png)

</div>
