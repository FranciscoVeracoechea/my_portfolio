const getLookup = files => files.reduce((acc, file) => ({
  ...acc,
  [String(file._id)]: file.name,
}), {});

export const skills = files => [
  { title: 'Name', field: 'name' },
  { title: 'Category', field: 'categoryName', editable: 'never' },
  { title: 'Link', field: 'link' },
  { title: 'Level', field: 'level' },
  {
    title: 'Created At',
    field: 'diffForHumans',
    editable: 'never',
  },
  {
    title: 'Image',
    field: 'image',
    ...(files ? { lookup: getLookup(files) } : { lookup: {} }),
  },
];

export const category = [
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
];
