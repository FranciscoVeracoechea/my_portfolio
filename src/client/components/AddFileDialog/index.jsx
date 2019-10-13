import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, TextField,
  DialogTitle, Button, MenuItem,
} from '@material-ui/core';


const AddFileDialog = ({ open, onClose, onSubmit }) => {
  const kindOfFile = ['picture', 'curriculum_vitae', 'profile'];
  const [value, setValue] = useState(kindOfFile[0]);
  const [fileName, setFileName] = useState('');
  const handleOnChange = e => setValue(e.target.value);
  const handleOnChoooseFile = e => setFileName(e.target.value.replace('C:\\fakepath\\', ''));
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">Add a new file</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="File Name"
            margin="dense"
            name="name"
            fullWidth
            required
          />
          <TextField
            id="select-kind-of-file"
            select
            name="kind"
            label="kind of file"
            margin="dense"
            value={value}
            onChange={handleOnChange}
            fullWidth
            required
          >
            {kindOfFile.map(kind => (
              <MenuItem key={kind} value={kind}>
                {kind}
              </MenuItem>
            ))}
          </TextField>
          <label htmlFor="add-file-input">
            <input
              style={{ display: 'none' }}
              id="add-file-input"
              type="file"
              name="file"
              required
              onChange={handleOnChoooseFile}
            />
            <Button color="primary" variant="contained" component="span">
              Upload
            </Button>
            {` ${fileName}`}
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFileDialog;
