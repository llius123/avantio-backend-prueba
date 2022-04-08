# Api dockerizada

Si tengo una api dockerizada cuando levante el docker-compose tiene que tener el comando --service-ports y los puertos mapeados en la config si no, no es posible acceder a la api desde fuera del cotenedor

# TypeORM + mongodb

## Apunte importante sobre la configuracion de acceso a la bbdd

Las bbdd normalmente tienen el host: localhost.
Pues mongodb no, asi que el parametro host hay que poner mongodb.

## Conectarme a un bbdd de mongo

TypeORM permite 2 formas de conexion, por medio de un archivo de configuracion json o por medio de un objeto js.

### Conexion por medio de un archivo de configuracion json

El archivo se tiene que llamar ormconfig.json.
De esta forma lo que estamos haciendo es meter la configuracion de conexion de forma global y desde el inicio de la app.
La forma de acceder a datos seria tal que asi:

```javascript
createConnection()
  .then(async (connection) => {
    const manager = await connection.getMongoRepository(Profile).find({
      where: { career: "career" },
    });
    console.log(manager);
  })
  .catch((error) => console.log("Error: ", error));
```

### Conexion por medio de obj js

Se crea un obj de configuracion.

```javascript
const AppDataSource = new DataSource({
  type: "mongodb",
  host: "mongodb",
  port: 27017,
  database: "database",
  synchronize: true,
  logging: true,
  entities: [Profile],
  subscribers: [],
  migrations: [],
});
// IMPORTANTE, se inicializa
await AppDataSource.initialize();
const manager = await AppDataSource.getMongoRepository(Profile).find({
  where: { career: "career" },
});
```
