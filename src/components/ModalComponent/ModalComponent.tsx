import React, { useState, useEffect } from 'react';
import { ModalFooter, ModalBody, ModalHeader, ButtonGroup, Button, Accordion, TextInput } from "@contentstack/venus-components"
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

  const [titleMatcher, setTitleMatcher] = useState<String>("Matcher")

  useEffect(() => {
    // Fetch data from Contentstack SDK
    ContentstackAppSDK.init().then((sdk) => {
      console.log(sdk)
      const newData = sdk.location.CustomField?.field.getData();
      setTitleMatcher(sdk.location.CustomField?.field.schema.display_name);

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

  const handleDelete = (category: keyof JsonData, fromIndex: number) => {
    setJsonData((prevData) => {
      const newData = { ...prevData };
      newData[category].splice(fromIndex, 1);
      return newData;
    });
  };

  const stringToColour = (str: string) => {
    let hash = 0;
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return { color: colour }
  }

  const renderCategory = (category: keyof JsonData) => {

    const notDefault = (category !== 'default')

    return (
      <div>
        {jsonData[category].map((item, index) => (
          <div key={index} className="matcher-item">
            {notDefault &&
              <div className="reorder-buttons">
              <Button onlyIcon icon="v2-ArrowUp" size="small" version="v2" buttonType="" onClick={() => handleMoveItem(category, index, index - 1)}>
                Move Up
                </Button>
                <Button onlyIcon icon="v2-ArrowDown" size="small" version="v2" buttonType="" onClick={() => handleMoveItem(category, index, index + 1)}>
                Move Down
                </Button>
              </div>
            }
            <label style={stringToColour(item.blueprints.vacancy_detail)} className={(jsonData[category][index -1]?.blueprints.vacancy_detail === item.blueprints.vacancy_detail) ? 'same' : '' }>
              {index === 0 &&
                <>Blueprint:</>
              }
              <TextInput
                type="text"
                placeholder="%URL"
                version="v2"
                width="full"
                required

                value={item.blueprints.vacancy_detail}
                onChange={(e:any) =>
                  handleInputChange(category, index, 'blueprints.vacancy_detail', e.target.value)
                }
              ></TextInput>

            </label>
            {notDefault && <><label>
              {index === 0 &&
                <>Condition:</>
              }

              <TextInput
                type="text"
                version="v2"
                width="full"
                required
                value={item.condition}
                onChange={(e:any) => handleInputChange(category, index, 'condition', e.target.value)}
              />
            </label>
            <Button onlyIcon icon="v2-Delete" size="small" version="v2" buttonType="" onClick={() => handleDelete(category, index)}>
              Delete
            </Button></>}
          </div>
        ))}
        {notDefault &&
          <Button buttonType="secondary" icon="v2-Plus" size="small" version="v2" onClick={() => handleAddItem(category)} className="add-new-button">
            Add New Item
          </Button>}
      </div>
    )
  };

  const save = () => {
    removeEmptyItems();
  }

  const removeEmptyItems = () => {
    setJsonData((prevData) => {
      const newData = { ...prevData };

      newData.vacancy_id = newData.vacancy_id.filter((item) => item.condition.length && item.blueprints.vacancy_detail.length)
      newData.work_area = newData.work_area.filter((item) => item.condition.length && item.blueprints.vacancy_detail.length)
      newData.title = newData.title.filter((item) => item.condition.length && item.blueprints.vacancy_detail.length)
      ContentstackAppSDK.init().then((sdk) => {
        sdk.location.CustomField?.field.setData(newData);
      });
      return newData;
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
      <ModalHeader title={titleMatcher} closeModal={props.closeModal} />
      <ModalBody className="modalBodyCustomClass" style={{
        maxHeight: 'calc(100vh - 224px)'
      }}>
        <div>
          <form className="customAccordionSpacing">
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
            version="v2"
            noChevron>
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
