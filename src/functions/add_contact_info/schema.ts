export default {
  type: "object",
  properties: {
    contact_number: { type: 'string' },
    contact_number_type: { type: 'string' },
    created_by: { type: 'string' },
    updated_by: { type: 'string' },
    id: { type: 'number' },
  },
  required: ['contact_number', 'id']
} as const;
