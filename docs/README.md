# Documentation

## What is Ethereum Chat-App?

Ethereum Chat-App is a project that emerged from a school project and aims to offer a messenger that works independently
of central instances and enables decentralised transactions between users with the help of cryptocurrencies. The browser
extension Metamask and the Web3.js Api serve as the interface for decentralised transactions in the Ethereum network.
[More detailed information can be found here.](https://github.com/Jufg/Chat-App-ETH/tree/main/docs/papers)

## Project Structure

Here is the folder structure of the React app with annotations:

```
    📦src
     ┣ 📂actions // Redux.js actions
     ┃  ┣ 📜auth.actions.js
     ┃  ┗ ...
     ┣ 📂components // Recurring components of the Sites
     ┃  ┣ 📂Header
     ┃  ┣ 📂Layout
     ┃  ┣ 📂UI
     ┃  ┗ 📜PrivateRoute.js
     ┣ 📂containers // Pages of the App
     ┃  ┣ 📂HomePage
     ┃  ┃  ┣ 📜index.js // React Component
     ┃  ┃  ┗ 📜style.css
     ┃  ┣ 📂LoginPage
     ┃  ┗ ...
     ┣ 📂reducers // Redux.js Reducer
     ┃  ┣ 📜auth.reducer.js
     ┃  ┗ ...
     ┣ 📂store // Redux.js Store
     ┣ 📂utils // Useful components and algorithms
     ┣ 📜App.js
     ┗ 📜index.js
```

## How to run the Project

### `.env`

Before you can run the current Version of the project, you must set up the .env file, wich must be located in the
project directory. In this file you can safely store data for the application, such as API-KEY's or other important
things.

To get the application running with [Firebase](https://firebase.google.com/) use this layout:

```dotenv
    REACT_APP_APP_ID=Your App ID
    REACT_APP_API_KEY=Your API-Key
    REACT_APP_PROJECT_ID=The ID of your project
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

