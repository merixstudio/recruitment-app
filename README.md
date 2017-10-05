# Merixstudio Recrutation App Frontend

## Technologies used:
- React
- MobX
- Webpack
- Karma with Jasmine
- Enzyme
- Nightwatch with Selenium

## Using application

Before doing anything with this repository u have to install dependecies
```
npm install -g yarn
```

```
yarn install
```

To view application without backend present run it with mocked backend data using
```
yarn run startMocked
```
- for quiz in progress navigate to: [http://localhost:4000/goodid](http://localhost:4000/goodid)
- for submitted quiz: [http://localhost:4000/wrongid](http://localhost:4000/submittedid)
- to see how application lookes when invalid id is provided: [http://localhost:4000/wrongid](http://localhost:4000/wrongid)

## Testing
For unit testing run:
```
yarn run test
```

For e2e testing, start application with mocked backend data using
```
yarn run startMocked
```
and start nightwatch in a second thread
```
yarn run e2e
```
