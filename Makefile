run:
	npm run dev

fmt:
	npm run format

start:
	npm start

b:
	npm run build

logs:
	docker logs -f school-backend


# Build the Docker image
build:
	docker build -t school-backend .

# Stop and remove the existing container (if it exists)
clean:
	docker stop school-backend || true && docker rm school-backend || true

# Run the container in production mode with explicit environment variables
run-production:
	docker run -d \
		--restart always \
		--name school-backend \
		-p 6002:6002 \
		-e REDIS_URL=localhost:6379 \
		-e PROD_REDIS_URL=188.166.174.59:6379 \
		-e NODE_ENV=production \
		school-backend

# Run the container using the .env file (for development or other environments)
run-env:
	docker run -d \
		--restart always \
		--name school-backend \
		-p 6002:6002 \
		--env-file .env \
		school-backend

# Deploy the application in production mode
deploy: build clean run-production

# Deploy the application using the .env file
deploy-env: build clean run-env
