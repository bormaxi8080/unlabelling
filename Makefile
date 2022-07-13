package: build
	@mkdir -p dist-zip;\
		cd dist;\
		zip -r ../dist-zip/inoblock-`awk '/"version":/{gsub(/[",]/, "", $$2);print $$2}' manifest.json`.zip *

build: clean
	@npm run build

clean:
	@rm -rf dist/*

