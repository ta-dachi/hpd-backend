export default {
  type: "object",
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    contact_role: { type: 'string' },
    created_by: {type: 'string'},
    email: {type: 'string'},
    contact_number_default: {type: 'string'},
    contact_number_type_default: {type: 'string'}
  },
  required: ['first_name', 'last_name', 'contact_role', 'contact_number_default', 'contact_number_type_default']
} as const;
