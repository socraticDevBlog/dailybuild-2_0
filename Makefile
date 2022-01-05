default: deps build

build:
	npm start
live:
	npm run dev

deps:
	npm install

clean:
	rm -r public
