export default [
  {
    title: 'Kind',
    field: 'kind',
    lookup: {
      picture: 'Picture',
      curriculum_vitae: 'Curriculum Vitae',
      profile: 'Profile',
    },
  },
  { title: 'Url', field: 'url' },
  { title: 'Name', field: 'name' },
  {
    title: 'Created At',
    field: 'createdAt',
    editable: 'never',
  },
];
