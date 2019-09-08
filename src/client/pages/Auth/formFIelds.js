export default data => [
  {
    field: 'Username',
    forRegisterOnly: true,
    props: {
      defaultValue: data?.username,
      required: true,
      type: 'text',
    },
    helperText: '',
  },
  {
    field: 'Fullname',
    forRegisterOnly: true,
    props: {
      defaultValue: data?.fullname,
      required: true,
      type: 'text',
    },
    helperText: '',
  },
  {
    field: 'Email',
    props: {
      defaultValue: data?.email,
      required: true,
      type: 'email',
    },
    helperText: '',
  },
  {
    field: 'Password',
    props: {
      defaultValue: data?.password,
      required: true,
      type: 'text',
    },
    helperText: '',
  },
  {
    field: 'AUTH_TOKEN',
    forRegisterOnly: true,
    props: {
      defaultValue: '',
      required: true,
      type: 'text',
    },
    helperText: '',
  },
];
