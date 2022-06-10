import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import 'dotenv/config'
import { AppDataSource } from 'src/data-source';

const get_contacts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    // TODO Replace * with the fields you want
    const sql = `
    SELECT * 
    FROM help_desk.contacts c
    INNER JOIN help_desk.contact_info ci 
    ON c.id = ci.id
    ORDER BY c.last_name
    `

    await AppDataSource.initialize()
    const rawData = await AppDataSource.query(sql)
    await AppDataSource.destroy()

    return formatJSONResponse({
      message: JSON.stringify(rawData),
    });
  } catch (error) {
    console.error(error)
    return formatJSONResponse({
      statusCode: 400,
      message: `Could not get contacts.`,
      event,
    });
  }

};

export const main = middyfy(get_contacts);
