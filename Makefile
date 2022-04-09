SERVICE_BACK_NAME=avantio-back-node
SERVICE_DATABASE_NAME=database
install:
	docker-compose run --rm $(SERVICE_BACK_NAME) npm install
up-dev:
	docker-compose up --remove-orphans
test-dev:
	docker-compose run --service-ports --rm $(SERVICE_BACK_NAME) npm run test
build:
	docker-compose run --service-ports --rm $(SERVICE_BACK_NAME) npm run build