setup:
	@echo "--- Installing dependencies ---"
	npm ci

test: setup
	@echo "--- Running tests ---"
	npm run test

build: test
	@echo "--- Building the project ---"
	npm run build --if-present

version: build
	@echo "-- Versioning and tagging the release --"
	npm version patch

publish: version
	@echo "--- Publishing the package ---"
	git push origin main
	git push origin --tags
	@echo "--- Running npm publish ---"

