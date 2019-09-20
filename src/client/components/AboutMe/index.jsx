import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
// components
import Loader from '../Loader';
// helper
import columns from './columns';
import { isFirstRender } from '../../../shared/utils/functional';


const AboutMe = ({
  data: { data, loading },
  createData,
  fetchData,
  updateData,
  deleteData,
}) => {
  useEffect(() => {
    if (isFirstRender(data)) {
      fetchData();
    }
  }, [data, fetchData]);

  if (loading) return <Loader size="6em" variant="determinate" />;

  return (
    <div>
      <MaterialTable
        title="About Me"
        columns={columns}
        data={data.map(d => Object.assign({}, d))}
        editable={{
          onRowAdd: newData => createData(newData),
          onRowUpdate: (newData, oldData) => updateData(newData, data.findIndex(e => e._id === oldData._id)),
          onRowDelete: oldData => deleteData(oldData._id, data.findIndex(e => e._id === oldData._id)),
        }}
      />
    </div>
  );
};

export default AboutMe;
