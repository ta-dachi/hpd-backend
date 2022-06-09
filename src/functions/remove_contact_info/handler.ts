import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import 'dotenv/config'
import { AppDataSource } from 'src/data-source';

const get_contacts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    if (!event.body.id) {
      return formatJSONResponse({
        statusCode: 400,
        message: `id required.`,
        event,
      });
    }

    const sql = `
      DELETE FROM help_desk.contacts_info
      WHERE contacts_id = $1
      RETURNING *
    `

    await AppDataSource.initialize()
    const rawData = await AppDataSource.query(sql, 
      [event.body.contact_id]
    )
    await AppDataSource.destroy()
    
    return formatJSONResponse({
      message: JSON.stringify(rawData),
    });
  } catch (error) {
    console.error(error)
    return formatJSONResponse({
      statusCode: 400,
      message: `Could not remove contact.`,
      event,
    });
  }

};

export const main = middyfy(get_contacts);
