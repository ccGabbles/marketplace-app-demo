import React from "react"
import { ModalFooter, ModalBody, ModalHeader, ButtonGroup, Button } from "@contentstack/venus-components"


const SelectModal = (props:any) => {
   return (
       <>
           <ModalHeader title={"Select Asset"} closeModal={props.closeModal} />
           <ModalBody className="modalBodyCustomClass">
               <div className="dummy-body">
                   Contenstack Asset Picker
               </div>
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
   )
}

export default SelectModal;
