# Api dockerizada

Si tengo una api dockerizada cuando levante el docker-compose tiene que tener el comando --service-ports y los puertos mapeados en la config si no, no es posible acceder a la api desde fuera del cotenedor

# TypeORM + mongodb

## Apunte importante sobre la configuracion de acceso a la bbdd

Las bbdd normalmente tienen el host: localhost.
Pues mongodb no, asi que el parametro host hay que poner mongodb.

## Conectarme a un bbdd de mongo

### En resumen, no usar typeorm con mongo

Me ha dado muchisimos problemas, mejor usar un ODM que ya este preparado para mongo y no un ORM.
