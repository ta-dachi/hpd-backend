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
      created_by = $4,
      email = $5,
      contact_number_default = $6,
      contact_number_type_default = $7
      WHERE id = $8
      RETURNING *;
    `

    await AppDataSource.initialize()
    // Parameterized SQL to prevent SQL injection
    // See https://stackoverflow.com/questions/54684928/how-to-use-parameterized-query-using-typeorm-for-postgres-database-and-nodejs-as
    // And https://www.ge.com/digital/documentation/historian/version72/c_parameterized_sql_queries.html#:~:text=Parameterized%20SQL%20queries%20allow%20you,values%20and%20for%20different%20purposes.
    // https://stackoverflow.com/questions/4712037/what-is-parameterized-query
    const rawData = await AppDataSource.query(sql, 
      [event.body.first_name ?? "", event.body.last_name ?? "", event.body.contact_role ?? "", event.body.created_by ?? "", 
      event.body.email ?? "", event.body.contact_number_default ?? "", event.body.contact_number_type_default ?? "", event.body.id]
    )
    await AppDataSource.destroy()

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
