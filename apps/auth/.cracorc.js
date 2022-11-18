const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = () => ({
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "playlist",
          filename: "remoteEntry.js",
          remotes: {
            movies: "movies@http://localhost:3000/remoteEntry.js",
          },
          shared: {
            ...deps,
            card: {
              singleton: true,
            },
            "movies-content": {
              singleton: true,
            },
            "playlist-content": {
              singleton: true,
            },
            "auth-content": {
              singleton: true,
            },
            "auth-context": {
              singleton: true,
            },
            "auth-service": {
              singleton: true,
            },
            tsconfig: {
              singleton: true,
            },
            ui: {
              singleton: true,
            },
            hooks: {
              singleton: true,
            },
            form: {
              singleton: true,
            },
            store: {
              singleton: true,
            },
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
});
