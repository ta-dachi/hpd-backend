import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'PUT',
        path: 'update_contact_info',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};