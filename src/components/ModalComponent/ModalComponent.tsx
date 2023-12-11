import { ModalFooter, ModalBody, ModalHeader, ButtonGroup, Button } from "@contentstack/venus-components"
import "./ModalComponent.css";
import mockData from "./mockData";



const SelectModal = (props:any) => {

  function fillElement(json: any, type: any) {
    const defaultElement = document.getElementById("default");
    const matcherElement = document.getElementById("matcher");

    if (!defaultElement || !matcherElement) {
      console.error("Elements not found");
      return;
    }

    defaultElement.value = json.default || "";

    const fragment2 = document.createDocumentFragment();
    const fieldSet2 = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = type;
    let temp = "";

    if (json[type] && Array.isArray(json[type])) {
      json[type].forEach((x: any) => {
        const input = document.createElement("input");
        const input2 = document.createElement("input");
        const fieldSet = document.createElement("fieldset");
        const fragment = document.createDocumentFragment();

        console.log(temp, x?.condition);

        if (temp === x?.blueprints?.vacancy_detail) {
          input2.classList.add("hidden");
        } else {
          fragment2.appendChild(document.createElement("hr"));
          fragment2.appendChild(document.createElement("hr"));
        }

        temp = x?.blueprints?.vacancy_detail;

        input.value = x?.condition || "";
        input.id = "id" + (x?.condition || "");
        input.type = "text";
        input.classList.add("condition");
        input2.value = x?.blueprints?.vacancy_detail || "";
        input2.id = "value" + (x?.condition || "");
        input2.type = "text";
        fieldSet.id = type;
        fragment
          .appendChild(fieldSet)
          .appendChild(input)
          .parentElement?.appendChild(input2);

        fragment2.appendChild(input2);
        fragment2.appendChild(input);
      });
    }

    fieldSet2.appendChild(legend);
    matcherElement.appendChild(fieldSet2).parentElement?.appendChild(fragment2);
  }

  fillElement(mockData, "vacancy_id");
  fillElement(mockData, "title");
  fillElement(mockData, "work_area");

  return (
  <>
    <ModalHeader title={"Select Asset"} closeModal={props.closeModal} />
    <ModalBody className="modalBodyCustomClass">
      <form id="matcher">
        <fieldset>
          <input id="default" type="text" />
          <legend>Default</legend>
        </fieldset>
      </form>
    </ModalBody>
    <ModalFooter>
      <ButtonGroup>
        <Button onClick={props.closeModal} buttonType="light">
          Cancel
        </Button>
        <Button onClick={props.closeModal} icon="SaveWhite" disabled>
          Add Selected Asset
        </Button>
      </ButtonGroup>
    </ModalFooter>
  </>
)}

export default SelectModal;
