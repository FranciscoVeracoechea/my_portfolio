export default [
  { title: 'Key', field: 'key' },
  { title: 'Value', field: 'value' },
  {
    title: 'Category',
    field: 'category',
    lookup: {
      about_me: 'About Me',
      contact: 'Contact',
      objective: 'Objective',
      technical_description: 'Technical Description',
    },
  },
  {
    title: 'Icon',
    field: 'faIcon',
  },
  {
    title: 'Created At',
    field: 'createdAt',
    editable: 'never',
  },
];
