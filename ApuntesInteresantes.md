# Api dockerizada

Si tengo una api dockerizada cuando levante el docker-compose tiene que tener el comando --service-ports y los puertos mapeados en la config si no, no es posible acceder a la api desde fuera del cotenedor

# TypeORM + mongodb

## Apunte importante sobre la configuracion de acceso a la bbdd

Las bbdd normalmente tienen el host: localhost.
Pues mongodb no, asi que el parametro host hay que poner mongodb.

## Conectarme a un bbdd de mongo

### En resumen, no usar typeorm con mongo

Me ha dado muchisimos problemas, mejor usar un ODM que ya este preparado para mongo y no un ORM.

# Scraping

## Codificacion a la hora de hacer scraping

Esto es interesante porque la codificacion para scrapear cada periodico es distinto.
Para el mundo la codificacion tiene que ser latin1 y para el pais tiene que ser utf8, sino los accentos no aparecen.
