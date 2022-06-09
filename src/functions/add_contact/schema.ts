export default {
  type: "object",
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    contact_role: { type: 'string' },
    created_by: {type: 'string'},
  },
  required: ['first_name', 'last_name', 'contact_role']
} as const;
