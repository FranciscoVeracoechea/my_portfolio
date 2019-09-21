import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
// components
import Loader from '../Loader';
// helper
import columns from './columns';
import { isFirstRender } from '../../../shared/utils/functional';


const AboutMe = ({
  interest: { data, loading },
  fetchInterest,
  createInterest,
  updateInterest,
  deleteInterest,
}) => {
  useEffect(() => {
    if (isFirstRender(data)) fetchInterest();
  }, []);

  if (loading) return <Loader size="6em" />;

  return (
    <div>
      <MaterialTable
        title="Interests"
        columns={columns}
        data={data.map(d => Object.assign({}, d))}
        editable={{
          onRowAdd: newData => createInterest(newData),
          onRowUpdate: (newData, oldData) => updateInterest(newData, data.findIndex(e => e._id === oldData._id)),
          onRowDelete: oldData => deleteInterest(oldData._id, data.findIndex(e => e._id === oldData._id)),
        }}
      />
    </div>
  );
};

export default AboutMe;
