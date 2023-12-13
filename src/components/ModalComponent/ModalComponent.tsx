import React, { useState, useEffect } from 'react';
import { ModalFooter, ModalBody, ModalHeader, ButtonGroup, Button, Accordion } from "@contentstack/venus-components"
import "./ModalComponent.css";
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

const SelectModal = (props: any) => {

  const [jsonData, setJsonData] = useState<JsonData>({
    vacancy_id: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    title: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    work_area: [{ condition: '', blueprints: { vacancy_detail: '' } }],
    default: [{ condition: '', blueprints: { vacancy_detail: '' } }],
  });

  useEffect(() => {
    // Fetch data from Contentstack SDK
    ContentstackAppSDK.init().then((sdk) => {
      const newData = sdk.location.CustomField?.field.getData();

      // Update state with the new data
      setJsonData(newData);
    });
  }, []);

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

  const save = () => {
    ContentstackAppSDK.init().then((sdk) => {
      sdk.location.CustomField?.field.setData(jsonData);
    });
  }

  const close = () => {
    save()
    props.closeModal();
  }

  return (
    <div style={{
      width: 'calc(100vw - 100px)',
      height: 'calc(100vh - 100px)'
    }}>
      <ModalHeader title={"Vacancy Matcher"} closeModal={props.closeModal} />
      <ModalBody className="modalBodyCustomClass" style={{
        maxHeight: 'calc(100vh - 224px)'
      }}>
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
      <Accordion
        title="Json Preview"
        isContainerization
        version="v2">
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </Accordion>
    </div>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button onClick={props.closeModal} buttonType="light">
            Cancel
          </Button>
          <Button onClick={close} icon="SaveWhite">
            Save and close
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </div>
  )
}

export default SelectModal;
