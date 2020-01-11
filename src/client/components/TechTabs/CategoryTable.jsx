import React from 'react';
import MaterialTable from 'material-table';
// helper
import { category } from './columns';


const CategoryTable = ({
  data,
  create,
  update,
  remove,
  onChangeTab,
}) => (
  <MaterialTable
    title="Categories"
    columns={category}
    data={data.map(d => Object.assign({}, d))}
    editable={{
      onRowAdd: newData => create(newData),
      onRowDelete: oldData => remove(oldData._id, data.findIndex(e => e._id === oldData._id)),
      onRowUpdate: (newData, oldData) => update(data.findIndex(e => e._id === oldData._id), newData),
    }}
    actions={[
      {
        icon: 'list',
        tooltip: 'Skills',
        onClick: (e, d) => {
          onChangeTab(1, d._id);
        },
      },
    ]}
  />
);

export default CategoryTable;
