import React, { useState } from 'react';
import { Button, Accordion } from "@contentstack/venus-components"
import ContentstackAppSDK from "@contentstack/app-sdk";

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
  let CSdata: any = {
    vacancy_id: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    title: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    work_area: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    default: [{ condition: '', blueprints: { vacancy_detail: '' } }],
  };

  ContentstackAppSDK.init().then((sdk) => {
    CSdata = sdk.location.CustomField?.field.getData()
  });

  const [jsonData, setJsonData] = useState<JsonData>(CSdata);

  const handleInputChange = (
    category: keyof JsonData,
    index: number,
    field: string,
    value: string
  ) => {
    setJsonData((prevData) => {
      const newData: JsonData = { ...prevData };
      const newItem: VacancyItem = { ...newData[category][index] };

      // Use a helper function to update nested fields
      const updateNestedField = (obj: any, keys: string[], newValue: string) => {
        if (keys.length === 1) {
          obj[keys[0]] = newValue;
        } else {
          updateNestedField(obj[keys[0]], keys.slice(1), newValue);
        }
      };

      updateNestedField(newItem, field.split('.'), value);
      newData[category][index] = newItem;

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

  const renderCategory = (category: keyof JsonData) => {

    const notDefault = (category !== 'default')

    return (
      <div>
        {jsonData[category].map((item, index) => (
          <div key={index}>
            {notDefault && <label>
              Condition:
              <input
                type="text"
                value={item.condition}
                onChange={(e) => handleInputChange(category, index, 'condition', e.target.value)}
              />
            </label>}
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
            {notDefault &&
              <><Button onlyIcon icon="v2-ArrowUp" size="small" version="v2" buttonType="outline" onClick={() => handleMoveItem(category, index, index - 1)}>
                Move Up
              </Button><Button onlyIcon icon="v2-ArrowDown" size="small" version="v2" buttonType="outline" onClick={() => handleMoveItem(category, index, index + 1)}>
                  Move Down
                </Button></>}
          </div>
        ))}
        {notDefault &&
          <Button buttonType="secondary" icon="v2-Plus" size="small" version="v2" onClick={() => handleAddItem(category)}>
            Add New Item
          </Button>}
      </div>
    )
  };

  return (
    <div>
      <form>
        <Accordion
          accordionDataCount={1}
          isContainerization
          title="Default"
          version="v2">{renderCategory('default')}</Accordion>
        <Accordion
          accordionDataCount={jsonData.vacancy_id.length}
          isContainerization
          title="Vacancy ID"
          version="v2">{renderCategory('vacancy_id')}</Accordion>
        <Accordion
          accordionDataCount={jsonData.title.length}
          title="Title"
          isContainerization
          version="v2">{renderCategory('title')}</Accordion>
        <Accordion
          accordionDataCount={jsonData.work_area.length}
          isContainerization
          title="Work Area"
          version="v2">{renderCategory('work_area')}</Accordion>
      </form>

      <div>
        <h2>Updated JSON:</h2>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default BlueprintMatcherEditor;
