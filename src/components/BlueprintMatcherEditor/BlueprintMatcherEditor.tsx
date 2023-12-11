import React, { useState } from 'react';

interface JsonData {
  vacancy_id: VacancyItem[];
  title: VacancyItem[];
  work_area: VacancyItem[];
  default: VacancyItem[];
}

interface VacancyItem {
  condition: string;
  blueprints: {
    vacancy_detail: string;
  };
}

const BlueprintMatcherEditor = () => {
  const [jsonData, setJsonData] = useState<JsonData>({
    vacancy_id: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    title: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    work_area: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    default: [{ condition: '', blueprints: { vacancy_detail: '%defaultvacancydetail' } }],
  });

  const handleInputChange = (
    category: keyof JsonData,
    index: number,
    field: string,
    value: string
  ) => {
    setJsonData((prevData) => {
      const newData:any = { ...prevData };
      newData[category][index][field] = value;
      return newData;
    });
  };

  const handleAddItem = (category: keyof JsonData) => {
    setJsonData((prevData) => {
      const newData = { ...prevData };
      newData[category].push({ condition: '', blueprints: { vacancy_detail: '' } });
      return newData;
    });
  };

  const handleMoveItem = (category: keyof JsonData, fromIndex: number, toIndex: number) => {
    setJsonData((prevData) => {
      const newData = { ...prevData };
      const [movedItem] = newData[category].splice(fromIndex, 1);
      newData[category].splice(toIndex, 0, movedItem);
      return newData;
    });
  };

  const renderCategory = (category: keyof JsonData, title: string) => (
    <div>
      <h2>{title}</h2>
      {jsonData[category].map((item, index) => (
        <div key={index}>
          <label>
            Condition:
            <input
              type="text"
              value={item.condition}
              onChange={(e) => handleInputChange(category, index, 'condition', e.target.value)}
            />
          </label>
          <label>
            Blueprints:
            <input
              type="text"
              value={item.blueprints.vacancy_detail}
              onChange={(e) =>
                handleInputChange(category, index, 'blueprints.vacancy_detail', e.target.value)
              }
            />
          </label>
          <button type="button" onClick={() => handleMoveItem(category, index, index - 1)}>
            Move Up
          </button>
          <button type="button" onClick={() => handleMoveItem(category, index, index + 1)}>
            Move Down
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddItem(category)}>
        Add New Item
      </button>
    </div>
  );

  return (
    <div>
      <h1>Edit JSON</h1>

      <form>
        {renderCategory('default', 'Default')}
        {renderCategory('vacancy_id', 'Vacancy ID')}
        {renderCategory('title', 'Title')}
        {renderCategory('work_area', 'Work Area')}
      </form>

      <div>
        <h2>Updated JSON:</h2>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default BlueprintMatcherEditor;
