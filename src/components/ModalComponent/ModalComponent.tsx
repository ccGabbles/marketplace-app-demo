import { ModalFooter, ModalBody, ModalHeader, ButtonGroup, Button } from "@contentstack/venus-components"
import BlueprintMatcherEditor from "../BlueprintMatcherEditor/BlueprintMatcherEditor";
import "./ModalComponent.css";
import ContentstackAppSDK from "@contentstack/app-sdk";

const SelectModal = (props:any) => {

  const close = () => {
    props.closeModal();
  }

  return (
    <div style={{
      width: 'calc(100vw - 100px)',
      height: 'calc(100vh - 100px)'
    }}>
      <ModalHeader title={"Select Asset"} closeModal={props.closeModal} />
      <ModalBody className="modalBodyCustomClass" style={{
        maxHeight: 'calc(100vh - 224px)'
      }}>
        <BlueprintMatcherEditor />
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button onClick={props.closeModal} buttonType="light">
            Cancel
          </Button>
          <Button onClick={close} icon="SaveWhite">
            Close
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </div>
  )
}

export default SelectModal;
