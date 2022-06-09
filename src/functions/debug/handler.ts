import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import 'dotenv/config'

const debug: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    return formatJSONResponse({
      message: `${process.env.DB_HOST}  ${process.env.DB_USERNAME} ${process.env.DB_DATABASE}`,
    });
  } catch (error) {
    console.error(error)
    return formatJSONResponse({
      statusCode: 400,
      message: `Could not get debugging details.`,
      event,
    });
  }

};

export const main = middyfy(debug);
