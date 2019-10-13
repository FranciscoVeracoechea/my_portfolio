import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
// components
import Loader from '../Loader';
import AddFileDialog from '../AddFileDialog';
// helper
import columns from './columns';
import { isFirstRender } from '../../../shared/utils/functional';


const AboutMe = ({
  file: { data, loading },
  sendFile,
  fetchFiles,
  fetchCanceled,
  deleteFile,
}) => {
  const [open, setOpen] = useState(false);
  const handleOnOpen = () => setOpen(true);
  const handleOnClose = () => setOpen(false);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    sendFile(new FormData(e.target));
    setOpen(false);
  };
  useEffect(() => {
    if (isFirstRender(data)) fetchFiles();
    return () => fetchCanceled();
  }, []);

  if (loading) return <Loader size="6em" />;

  return (
    <>
      <MaterialTable
        title="Files"
        columns={columns}
        data={data.map(d => Object.assign({}, d))}
        editable={{
        //   onRowUpdate: (newData, oldData) => updateInterest(newData, data.findIndex(e => e._id === oldData._id)),
          onRowDelete: oldData => deleteFile(oldData._id, data.findIndex(e => e._id === oldData._id)),
        }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add File',
            isFreeAction: true,
            onClick: handleOnOpen,
          },
        ]}
      />
      <AddFileDialog
        open={open}
        onClose={handleOnClose}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default AboutMe;
