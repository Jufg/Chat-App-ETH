# Chat-App-ETH

This is the repository for my Ethereum Chat App.

The Ethereum Chat App will be developed as a dApp (decentralised application). To make the dApp as user-friendly as
possible, the front-end framework [React.js](https://reactjs.org/) will be used. The database used is
google [Firebase](https://firebase.google.com/).

## Documentation

[Here](docs/commit-docs/README.md) you can find the details of the individual commits in
the [master-branch](https://github.com/Jufg/Chat-App-ETH/commits/main).

## How to contribute

If you want to be a contributor to this project, please read
the [rules for commits and branches](docs/commit-rules/README.md) and find a suitable branch.

If you are looking for bugs that need to be fixed, you can find them [here](https://github.com/Jufg/Chat-App-ETH/issues)
.

## How to run the Project

### `.env`

Before you can run the project, you must set up the .env file, wich must be located in the project directory. In this
file you can safely store data for the application, such as API-KEY's or other important things.

To get the application running with [Firebase](https://firebase.google.com/) use this layout:

```
    REACT_APP_APP_ID=Your App ID
    REACT_APP_API_KEY=Your API-Key
    REACT_APP_PROJECT_NAME=The Name of your project
    REACT_APP_MESSAGING_SENDER_ID=The messaging-sender-id 
    REACT_APP_MEASUREMENT_ID=The Measurement-id
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project, so you have full control over them. All the commands except `eject` will still work, but they will
point to the copied scripts, so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

