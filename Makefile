SERVICE_NAME=avantio-back-node
install:
	docker-compose run --service-ports --rm $(SERVICE_NAME) npm install
up-dev:
	docker-compose run --service-ports --rm $(SERVICE_NAME) npm run dev
test-dev:
	docker-compose run --service-ports --rm $(SERVICE_NAME) npm run test
build:
	docker-compose run --service-ports --rm $(SERVICE_NAME) npm run build