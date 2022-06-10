import { REGION } from './GLOBALS';
import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import add_contact from '@functions/add_contact';
import get_contacts from '@functions/get_contacts';
import update_contact from '@functions/update_contact';
import remove_contact from '@functions/remove_contact';
import update_contact_info from '@functions/update_contact_info';
import remove_contact_info from '@functions/remove_contact_info';
import add_contact_info from '@functions/add_contact_info';
import debug from '@functions/debug';
import get_contact_by_id from '@functions/get_contact_by_id';
import get_contact_info from '@functions/get_contact_info';

const serverlessConfiguration: AWS = {	
  useDotenv: true,
  service: 'backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
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
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE
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
    add_contact, get_contacts, update_contact, remove_contact, get_contact_by_id,
    add_contact_info, update_contact_info, remove_contact_info, get_contact_info},
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
