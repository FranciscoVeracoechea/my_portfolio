import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
// helper
import columns from './columns';


const CategoryTable = ({
  data,
  create,
  // delete,
  // updateInterest,
  // deleteInterest,
}) => (
  <MaterialTable
    title="Categories"
    columns={columns.category}
    data={data.map(d => Object.assign({}, d))}
    editable={{
      onRowAdd: newData => create(newData),
      // onRowUpdate: (newData, oldData) => updateInterest(newData, data.findIndex(e => e._id === oldData._id)),
      // onRowDelete: oldData => deleteInterest(oldData._id, data.findIndex(e => e._id === oldData._id)),
    }}
  />
);

export default CategoryTable;
