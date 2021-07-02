# Next.js Playlist Playgroung (using Spotify as source for songs!)

## App screenshots

**Landing and login screen**

![image](https://user-images.githubusercontent.com/485403/124318378-f2a89a80-db4e-11eb-892e-e311ff301049.png)

**App Dashboard**

A playlist with no songs selected:

![image](https://user-images.githubusercontent.com/485403/124318450-0d7b0f00-db4f-11eb-98aa-23a367661ea4.png)

A playlist with some songs selected:

![image](https://user-images.githubusercontent.com/485403/124318334-e290bb00-db4e-11eb-875e-e3adc1a2044d.png)

**Screen to create new playlists**

When you are adding your first playlist
![image](https://user-images.githubusercontent.com/485403/124318174-9e9db600-db4e-11eb-9cf2-0eeb144e514c.png)

For the subsequent playlists after the first one
![image](https://user-images.githubusercontent.com/485403/124318637-4e732380-db4f-11eb-841a-65fe9dd2c7c7.png)


## Tech stach used

### NodeJS

The node version used id 15 (v15.13.0 to be precise). To set it, I use `nvm` like this:

```bash
$ nvm use 15.13.0
```

You can take a look [here](https://github.com/nvm-sh/nvm) to learn more about `nvm`, including setup intructions and full documentation.

### NextJS

The frontend and SSR I chose for the project is [NextJS](https://nextjs.org/).

The main reasons being:

- Very active project: 8640 commits | 1183 releases | 1660 contributors as of July/2021,
- Supported by Vercel (formerly Zeit) + more than 10 main developers (including the creator of Webpack, people from Vercel and also a Mozilla Core Developer) + a very large community,
- Official (and officially maintained) examples for right about stack any setup: official examples,
- Easy to extend configurations for NodeJS, Babel, Webpack, etc. without ejecting,
- Out of the box support for server side rendering (SSR),
- Excellent support for server-side state hydration, consuming (rest or graphql) APIs,
- Out of the box support for amp pages,
- Easy severless deployments,
- Excellent integration with Apollo,
- Excellent performance benchmarks ([reference](https://blog.logrocket.com/next-js-vs-create-react-app))
- Great image optimization,
- And last but not least: Awesome developer experience!

### Client State Management

For the client-side state management, due to the simplicity of the app, I deemed unnecessary using something like Redux, and I opted for this instead:

- Cookie: for the access token, once obtained from Spotify login,
- Local storage: for browser persistance of playlists, even after token expiration,
- React component state: using hooks, simple yet poweful enough to model the use case in hand.

### Typescript

[Typescript](https://www.typescriptlang.org/) official website.

Even though it was a requirement, I'd still have chosen it. Here some of the reasons:

- Has a free IDE, that is created and maintained by the same company/people than the language itself (VS Code),
- In 2021, TS is more well-maintained and has more people working on it than Flow JS,
- more third-party types are available (estimated to roughly 8X),
- more libraries are written in TypeScript (naturally improving the quality of the interface types compared to reverse engineering the types)
- installing types using npm / DefinitelyTyped makes a lot of sense compared to flow-typed where type definitions are checked into your repository (and you’ll most likely forget to update them).

### UI Layout and Styles

For this project, I did not use any component or styles libraries. And since I was not using any modern component libraries, it just made sence to use a gradient background and some rounded-corners, to give the app this vintage style we used to see before we got used to some of the awesome component libraries available today, like MaterialUI.

### Development environment setup and code style considerations

The main pieces of the code styling and standard-compliance setup I used are the following:

- Editor config: ([link](https://editorconfig.org/)) EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- .gitignore: I used a standard .gitignore file from the [GitHub gitignore project](https://github.com/github/gitignore/blob/master/Node.gitignore),
- prettier: ([link](https://prettier.io/)) A great code formatter that smothly integrates with both editors and commit/push hooks,
- eslint: ([link](https://eslint.org/)) ESLint statically analyzes your code to quickly find problems. Many problems ESLint finds can be automatically fixed. I set it up to work side-by-side with prettier.
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## Interacting with the project

### Run the project

First, create an app on the [Spotify App Dashboard](https://developer.spotify.com/dashboard/applications) and get a client id.

Now clone the repo:

```sh
git clone git@github.com:matiasherranz/spotify-playlist-app.git
cd spotify-playlist-app
```

Then add the client ID you obtained on the first step to the .env file at the root of the project.

Activate Node 15 and install the project dependencies it and run it!

```sh
nvm use 15
npm install
npm run dev
```

Then go to [localhost:3000](localhost:3000) on your browser to see the project in action!

### Run the project in production mode

Create a production build of the project:

```bash
npm run build
```

Then you can either run a production-like instance locally:

```bash
npm start
```

Or deploy it to a Vercel's Now server right from GitHub following [this steps](https://nextjs.org/docs/deployment).

### Running the tests

To run the tests, use the following command:

```bash
npm run jest
```

This will run all tests, which includes:

- **Snapshot tests:** Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly,
- **Unit tests**
- Coverage tests.

#### The tools/libraries used for testing were:

- **Jest** [link](https://jestjs.io/): Jest is the main JavaScript testing framework I used, as it provides a complete and simple to use set of tools, including snapshot testing, coverage testing and easy mocking.
- **Enzyme** [link](https://enzymejs.github.io/enzyme/): Alongside Jest, I used Enzyme for rendering components, query and interact with the virtual DOM. Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.
- **redux-mock-store:** [link](https://github.com/reduxjs/redux-mock-store) A mock store for testing Redux async action creators and middleware.
