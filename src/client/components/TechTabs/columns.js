export default {
  category: [
    { title: 'Name', field: 'name' },
    { title: 'Order', field: 'order' },
    {
      title: 'Number of skills',
      field: 'skillCount',
      editable: 'never',
    },
    {
      title: 'Created At',
      field: 'diffForHumans',
      editable: 'never',
    },
  ],
  skills: [
    { title: 'Name', field: 'name' },
    { title: 'Category', field: 'categoryName', editable: 'never' },
    { title: 'Link', field: 'link' },
    { title: 'Level', field: 'level' },
    {
      title: 'Created At',
      field: 'diffForHumans',
      editable: 'never',
    },
  ],
};
