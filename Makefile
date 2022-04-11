SERVICE_BACK_NAME=avantio-back-node
SERVICE_BACK_DATABASE=mongodb
SERVICE_BACK_TEST_INFRAESTRUCTURE=avantio-back-test-e2e
SERVICE_BACK_TEST_E2E=avantio-back-test-e2e
SERVICE_DATABASE_NAME=database
install:
	docker-compose run --rm $(SERVICE_BACK_NAME) npm install
up-dev:
	docker-compose up $(SERVICE_BACK_DATABASE) $(SERVICE_BACK_NAME)
test-dev:
	docker-compose run --service-ports --rm $(SERVICE_BACK_NAME) npm run test
test-unit:
	docker-compose run --service-ports --rm $(SERVICE_BACK_TEST_E2E) npm run test:unit
test-infraestructure:
	docker-compose run --service-ports --rm $(SERVICE_BACK_TEST_INFRAESTRUCTURE) npm run test:infraestructure 
test-e2e:
	docker-compose run --service-ports --rm $(SERVICE_BACK_TEST_E2E) npm run test:e2e 
build:
	docker-compose run --service-ports --rm $(SERVICE_BACK_NAME) npm run build