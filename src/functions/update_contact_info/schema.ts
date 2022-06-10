export default {
  type: "object",
  properties: {
    contact_number: { type: 'string' },
    contact_number_type: { type: 'string' },
    created_by: { type: 'string' },
    updated_by: { type: 'string' },
    contact_id: { type: 'number' },
  },
  required: ['contact_number', 'contact_number_type', 'contact_id']
} as const;
