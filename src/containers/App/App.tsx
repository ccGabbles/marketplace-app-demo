import { useEffect, useRef } from "react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import { Button, cbModal } from "@contentstack/venus-components";
import "@contentstack/venus-components/build/main.css";
import SelectModal from "../../components/ModalComponent/ModalComponent";


function App() {
 const ref = useRef(null);
 useEffect(() => {
   ContentstackAppSDK.init().then((sdk) => {
     // The snapshot of referenced DOM Element will render in-place of custom field when modal is opened
     const iframeWrapperRef = ref.current
     // or
     // const iframeWrapperRef = document.getElementById('root')
     window.iframeRef = iframeWrapperRef;

    //  window.postRobot = sdk.postRobot
     sdk.location.CustomField?.frame.updateHeight(55)
   })
 }, []);

 const handleClick = (e:any) => {
   cbModal({
     component: (props:any) => (<SelectModal {...props} />),
     modalProps: {
       size: "customSize"
     }
   })
 }

 return (
   <div ref={ref} className="extension-wrapper">
     <div className="btn-wrapper">
       <Button buttonType="tertiary-outline" onClick={handleClick}>
         Open Blueprint Matcher Editor
       </Button>
     </div>
   </div>
 );
}

export default App;
