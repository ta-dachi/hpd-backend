import { REGION } from './GLOBALS';
import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import add_contact from '@functions/add_contact';
import get_contacts from '@functions/get_contacts';
import update_contact from '@functions/update_contact';
import remove_contact from '@functions/remove_contact';
import debug from '@functions/debug';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        'Action': ['cognito-idp:AdminInitiateAuth', 'cognito-idp:AdminCreateUser', 'cognito-idp:AdminSetUserPassword'],
        Resource: "*" // Change this to the exact resource later
      } 
    ],
    region: REGION
  },
  // Resources
  // resources: {
  //   Resources: {
  //     UserPool: {
  //       Type: "AWS::Cognito::UserPool",
  //       Properties: {
  //         UserPoolName: "help-desk-user-pool",
  //         Schema: [
  //           {Name: "email", Required: true, Mutable: true},
  //         ],
  //         Policies: {
  //           PasswordPolicy: {
  //             MinimumLength: 8
  //           }
  //         },
  //         AutoVerifiedAttributes: ["email"]
  //       }
  //     },
  //     UserClient: {
  //       Type: "AWS::Cognito::UserPoolClient",
  //       Properties: {
  //         ClientName: "help-desk-user-pool-client",
  //         GenerateSecret: false,
  //         UserPoolId: {Ref: "UserPool"},
  //         AccessTokenValidity: 5,
  //         IdTokenValidity: 5,
  //         ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH"]
  //       }
  //     }
  //   }
  // },
  // import the function via paths
  functions: { hello, debug,
    add_contact, get_contacts, update_contact, remove_contact},
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: false,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    "serverless-offline": {
      httpPort: 4000
    }
  },
};

module.exports = serverlessConfiguration;
