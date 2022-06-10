import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import 'dotenv/config'
import { AppDataSource } from 'src/data-source';

const add_contact: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const sql = `
    INSERT INTO help_desk.contacts (first_name, last_name, contact_role, created_by, email, contact_number_default, contact_number_type_default)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
    `

    await AppDataSource.initialize()
    const rawData = await AppDataSource.query(sql, [event.body.first_name ?? "", event.body.last_name ?? "", event.body.contact_role?? "", event.body.created_by ?? "", event.body.email ?? "", event.body.contact_number_default ?? "", event.body.contact_number_type_default ?? "" ])
    await AppDataSource.destroy()
    
    return formatJSONResponse({
      message: JSON.stringify(rawData),
    });
  } catch (error) {
    console.error(error)
    return formatJSONResponse({
      statusCode: 400,
      message: `Could not add contact.`,
      event,
    });
  }

};

export const main = middyfy(add_contact);
