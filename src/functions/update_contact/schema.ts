export default {
  type: "object",
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    contact_role: { type: 'string' },
    created_by: {type: 'string'},
    id: {type: 'number'}
  },
  required: ['first_name', 'last_name', 'contact_role', 'id']
} as const;
