import type { AWS } from "@serverless/typescript";

import api from "@functions/api";

const serverlessConfiguration: AWS = {
    service: "serverless-graphql-api",
    frameworkVersion: "3",
    plugins: [
        "serverless-webpack",
        "serverless-webpack-prisma",
        "serverless-offline",
        "serverless-dotenv-plugin"
    ],
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        stage: "dev",
        profile: "sls-dev", // Your AWS profile here
        region: "eu-central-1",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000"
        }
    },
    // import the function via paths
    functions: { api },
    package: {
        individually: true,
        // Added to decrease output size to prevent size related issues.
        // Ref https://www.prisma.io/docs/guides/deployment/deployment-guides/caveats-when-deploying-to-aws-platforms#aws-lambda-upload-limit
        patterns: [
            "node_modules/.prisma/client/*",
            "!node_modules/.prisma/client/libquery_engine-*",
            "node_modules/.prisma/client/libquery_engine-rhel-*",
            "!node_modules/prisma/libquery_engine-*",
            "!node_modules/@prisma/engines/**"
        ]
    },
    custom: {
        webpack: {
            webpackConfig: "webpack.config.js",
            includeModules: true
        },
        "serverless-offline": {
            useChildProcesses: true
        }
    }
};

module.exports = serverlessConfiguration;
