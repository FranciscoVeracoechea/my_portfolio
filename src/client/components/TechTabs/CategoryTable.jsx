import React from 'react';
import MaterialTable from 'material-table';
// helper
import columns from './columns';


const CategoryTable = ({
  data,
  create,
  remove,
}) => (
  <MaterialTable
    title="Categories"
    columns={columns.category}
    data={data.map(d => Object.assign({}, d))}
    editable={{
      onRowAdd: newData => create(newData),
      onRowDelete: oldData => remove(oldData._id, data.findIndex(e => e._id === oldData._id)),
      // onRowUpdate: (newData, oldData) => update(newData, data.findIndex(e => e._id === oldData._id)),
    }}
    actions={[
      {
        icon: 'playlist_add',
        tooltip: 'Add new skill',
        onClick: console.log,
      },
      {
        icon: 'list',
        tooltip: 'Skills',
        onClick: console.log,
      },
    ]}
  />
);

export default CategoryTable;
