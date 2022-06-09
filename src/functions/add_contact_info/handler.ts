import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import 'dotenv/config'
import { AppDataSource } from 'src/data-source';

const update_contact_info: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const sql = `
    INSERT into help_desk.contact_info (contact_number, contact_number_type, created_by, updated_by, id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `

    await AppDataSource.initialize()
    const rawData = await AppDataSource.query(sql, 
      [event.body.contact_number ?? "", event.body.contact_number_type ?? "", event.body.created_by ?? "", event.body.updated_by ?? "", event.body.id]
    )

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

export const main = middyfy(update_contact_info);
