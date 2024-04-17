.PHONY: dev

dev:
	docker compose up -d 
	yarn turbo start:dev

