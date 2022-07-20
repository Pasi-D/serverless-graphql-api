# Serverless GraphQL API with Prisma + Apollo



This project is a derivative of `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/). Instead of using `esbuild` it uses `webpack`.

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Create a copy of `.env.dist`

```bash
cp .env.dist .env
```

Update the `.env` with appropriate values

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS
- Run `npm run remove` to destroy the Lambda deployed

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn deploy` to deploy this stack to AWS
- Run `yarn remove` to destroy the Lambda deployed

## Test your service

This repository contains a GraphQL API that can be run locally. It can be explored via [Apollo Studio](https://www.apollographql.com/docs/studio/).

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Locally

In order to test the hello function locally, run the following command:

- `npm run dev` if you're using NPM
- `yarn dev` if you're using Yarn


### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions                  # Lambda configuration and source code folder
│   │   ├── api
│   │   │   ├── handler.ts         # lambda source code
│   │   │   ├── index.ts           # lambda Serverless configuration
│   │   │   └── context.ts         # GraphQL context
│   │   │   └── db.ts              # Common database layer access (Prisma instance)
│   │   │   └── schema
│   │   │         └── builder.ts   # Schema builder
│   │   │         └── index.ts     # GraphQL schema
│   │   │   
│   │   └── index.ts               # Import/export of all lambda configurations
│   │
│   └── libs                       # Lambda shared code
│       └── apiGateway.ts          # API Gateway specific helpers
│       └── handlerResolver.ts     # Sharable library for resolving lambda handlers
│       └── lambda.ts              # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
└──tsconfig.paths.json         # Typescript paths
```

### Size Comparison between `esbuild` version and `webpack`

|                  | Webpack        | Esbuild   |
| ---              | ------         |  ------   |
| Bundle Size      | ~16.0KB        | ~44.0KB   |


### 3rd party libraries

- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) - Type checking without a burden on build performance.
- [serverless-webpack-prisma](https://github.com/danieluhm2004/serverless-webpack-prisma) - Deletes unnecessary prisma from bundling to Lambda.

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
