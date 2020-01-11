import React, { useEffect, useState, useCallback } from 'react';
import MaterialTable from 'material-table';
import Maybe, { Just, Nothing } from 'folktale/maybe';
// helper
import { skills } from './columns';


const SkillTable = ({
  files,
  data,
  selectedCategoryId,
  create,
  destroy,
  update,
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
    (selectedCategoryId ? Just(selectedCategoryId) : Nothing())
      .chain(id => Maybe.fromNullable(getSelectedSkills(data, id)))
      .fold(
        () => setCategory(Nothing()),
        x => setCategory(Just(x))
      );
  }, [data, selectedCategoryId]);

  const deleteCallback = useCallback((oldData) => {
    const categoryIndex = data.findIndex(e => e._id === selectedCategoryId);
    const skillIndex = data[categoryIndex].technologies.findIndex(e => e._id === oldData._id);
    return destroy(
      selectedCategoryId,
      categoryIndex,
      oldData._id,
      skillIndex
    );
  }, [selectedCategoryId, data, destroy]);

  const updateCallback = useCallback((newData, oldData) => {
    const categoryIndex = data.findIndex(e => e._id === selectedCategoryId);
    const skillIndex = data[categoryIndex].technologies.findIndex(e => e._id === oldData._id);
    return update(
      selectedCategoryId,
      categoryIndex,
      oldData._id,
      skillIndex,
      {
        image: newData.image,
        name: newData.name,
        level: newData.level,
        link: newData.link,
        description: newData.description,
      },
    );
  }, [selectedCategoryId, data, destroy]);
  return (
    <MaterialTable
      title={`Category: ${category.getOrElse(template).name}`}
      columns={skills(files)}
      data={category.getOrElse(template).technologies.map(d => Object.assign({}, d))}
      editable={{
        onRowAdd: newData => create(selectedCategoryId, newData),
        onRowUpdate: updateCallback,
        onRowDelete: deleteCallback,
      }}
    />
  );
};

export default SkillTable;
