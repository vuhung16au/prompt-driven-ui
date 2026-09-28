.PHONY: thumbs install clean-thumbs

# Install dependencies if node_modules doesn't exist
install:
	npm install

# Generate all thumbnails
thumbs:
	@echo "Generating thumbnails..."
	npx tsx scripts/create-thumbnails.ts

# Clean generated thumbnails
clean-thumbs:
	@echo "Cleaning up thumbs directory..."
	rm -rf thumbs/
