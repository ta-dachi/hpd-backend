import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import 'dotenv/config'
import { AppDataSource } from 'src/data-source';

const update_contact: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    if (!event.body.id) {
      return formatJSONResponse({
        statusCode: 400,
        message: `id required.`,
        event,
      });
    }

    const sql = `
      UPDATE help_desk.contacts
      SET first_name = $1,
      last_name = $2,
      contact_role = $3,
      created_by = $4
      WHERE id = $5
      RETURNING *
    `

    await AppDataSource.initialize()
    const rawData = await AppDataSource.query(sql, 
      [event.body.first_name ?? "", event.body.last_name ?? "", event.body.contact_role?? "", event.body.created_by ?? "", event.body.id]
    )

    return formatJSONResponse({
      message: JSON.stringify(rawData),
    });
  } catch (error) {
    console.error(error)
    return formatJSONResponse({
      statusCode: 400,
      message: `Could not update contact.`,
      event,
    });
  }

};

export const main = middyfy(update_contact);
