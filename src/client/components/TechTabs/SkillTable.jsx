import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Maybe, { Just, Nothing } from 'folktale/maybe';
// helper
import columns from './columns';


const SkillTable = ({
  data,
  selectedCategoryId,
  create,
}) => {
  const [category, setCategory] = useState(Nothing());
  const template = {
    name: '',
    technologies: [],
  };
  // helpers
  const getSelectedSkills = (categories, selectedId) => categories.find(
    x => x._id === selectedId
  );

  useEffect(() => {
    Maybe.of(selectedCategoryId)
      .chain(id => (id ? Just(id) : Nothing()))
      .chain(id => Maybe.fromNullable(getSelectedSkills(data, id)))
      .fold(
        () => setCategory(Nothing()),
        x => setCategory(Just(x))
      );
  }, [data, selectedCategoryId]);

  return (
    <MaterialTable
      title={`Category: ${category.getOrElse(template).name}`}
      columns={columns.skills}
      data={category.getOrElse(template).technologies.map(d => Object.assign({}, d))}
      editable={{
        onRowAdd: newData => create(selectedCategoryId, newData),
        // onRowUpdate: (newData, oldData) => updateInterest(newData, data.findIndex(e => e._id === oldData._id)),
        // onRowDelete: oldData => deleteInterest(oldData._id, data.findIndex(e => e._id === oldData._id)),
      }}
    />
  );
};

export default SkillTable;
