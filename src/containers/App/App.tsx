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

     sdk.location.CustomField?.frame.updateHeight(55)
     sdk.location.CustomField?.field.setData({
      "vacancy_id": [
        {
          "condition": "9170",
          "blueprints": {
            "vacancy_detail": "%blueprintitenvacancy-detail"
          }
        },
        {
          "condition": "6743",
          "blueprints": {
            "vacancy_detail": "%monteurhubvacancydetail"
          }
        },
        {
          "condition": "7285",
          "blueprints": {
            "vacancy_detail": "%monteurhubvacancydetail"
          }
        },
        {
          "condition": "8244",
          "blueprints": {
            "vacancy_detail": "%monteurhubvacancydetail"
          }
        },
        {
          "condition": "8755",
          "blueprints": {
            "vacancy_detail": "%monteurhubvacancydetail"
          }
        },
        {
          "condition": "8092",
          "blueprints": {
            "vacancy_detail": "%digitalvacancydetail"
          }
        }
      ],
      "title": [
        {
          "condition": "chauffeur",
          "blueprints": {
            "vacancy_detail": "%driverdepotvacancydetail"
          }
        },
        {
          "condition": "chauffeur b",
          "blueprints": {
            "vacancy_detail": "%driverspecialsvacancydetail"
          }
        },
        {
          "condition": "chauffeur be",
          "blueprints": {
            "vacancy_detail": "%driverdepotvacancydetail"
          }
        },
        {
          "condition": "chauffeur b(e)",
          "blueprints": {
            "vacancy_detail": "%driverdepotvacancydetail"
          }
        },
        {
          "condition": "chauffeur b(e) (test 18/4)",
          "blueprints": {
            "vacancy_detail": "%driverdepotvacancydetail"
          }
        },
        {
          "condition": "chauffeur c",
          "blueprints": {
            "vacancy_detail": "%driverhubvacancydetail"
          }
        },
        {
          "condition": "chauffeur ce",
          "blueprints": {
            "vacancy_detail": "%driverhubvacancydetail"
          }
        },
        {
          "condition": "chauffeur c(e)",
          "blueprints": {
            "vacancy_detail": "%driverhubvacancydetail"
          }
        },
        {
          "condition": "evenementen chauffeur",
          "blueprints": {
            "vacancy_detail": "%driverspecialsvacancydetail"
          }
        },
        {
          "condition": "chauffeur / vertegenwoordiger",
          "blueprints": {
            "vacancy_detail": "%driverspecialsvacancydetail"
          }
        },
        {
          "condition": "monteur",
          "blueprints": {
            "vacancy_detail": "%monteurdepotvacancydetail"
          }
        },
        {
          "condition": "technische medewerker",
          "blueprints": {
            "vacancy_detail": "%monteurdepotvacancydetail"
          }
        },
        {
          "condition": "onderhoudsmonteur",
          "blueprints": {
            "vacancy_detail": "%monteurdepotvacancydetail"
          }
        },
        {
          "condition": "junior onderhoudsmonteur",
          "blueprints": {
            "vacancy_detail": "%monteurdepotvacancydetail"
          }
        },
        {
          "condition": "monteur energy",
          "blueprints": {
            "vacancy_detail": "%monteurindustrialvacancydetail"
          }
        },
        {
          "condition": "energy monteur",
          "blueprints": {
            "vacancy_detail": "%monteurindustrialvacancydetail"
          }
        },
        {
          "condition": "monteur tools",
          "blueprints": {
            "vacancy_detail": "%monteurindustrialvacancydetail"
          }
        },
        {
          "condition": "flens monteur",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "service- & installatiemonteur",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "montagemedewerker",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "elektromonteur",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "monteur electro",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "allround technisch medewerker",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "montage medewerker",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "monteur bouwliften",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "monteur bouwplaatsinrichting",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "service monteur",
          "blueprints": {
            "vacancy_detail": "%monteurhubvacancydetail"
          }
        },
        {
          "condition": "area monteur",
          "blueprints": {
            "vacancy_detail": "%monteurhubvacancydetail"
          }
        },
        {
          "condition": "monteur buitendienst",
          "blueprints": {
            "vacancy_detail": "%monteurhubvacancydetail"
          }
        },
        {
          "condition": "monteur technische dienst",
          "blueprints": {
            "vacancy_detail": "%monteurhubtdvacancydetail"
          }
        },
        {
          "condition": "leerling monteur BBL",
          "blueprints": {
            "vacancy_detail": "%monteurbblvacancydetail"
          }
        },
        {
          "condition": "leerling assistent",
          "blueprints": {
            "vacancy_detail": "%monteurbblvacancydetail"
          }
        },
        {
          "condition": "stage monteur (bbl)",
          "blueprints": {
            "vacancy_detail": "%monteurbblvacancydetail"
          }
        },
        {
          "condition": "verkoopmedewerker",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "filiaalmedewerker",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "baliemedewerker",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "verhuurmedewerker",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "verkoper",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "Verkoopmedewerker (test 18/4)",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "bijbaan verkoopmedewerker",
          "blueprints": {
            "vacancy_detail": "%salessidejobvacancydetail"
          }
        },
        {
          "condition": "bijbaan",
          "blueprints": {
            "vacancy_detail": "%salessidejobvacancydetail"
          }
        },
        {
          "condition": "bijbaan verkoper",
          "blueprints": {
            "vacancy_detail": "%salessidejobvacancydetail"
          }
        },
        {
          "condition": "depot manager",
          "blueprints": {
            "vacancy_detail": "%managerdepotvacancydetail"
          }
        },
        {
          "condition": "depotmanager",
          "blueprints": {
            "vacancy_detail": "%managerdepotvacancydetail"
          }
        },
        {
          "condition": "filiaalmanager",
          "blueprints": {
            "vacancy_detail": "%managerdepotvacancydetail"
          }
        },
        {
          "condition": "assistent filiaalmanager",
          "blueprints": {
            "vacancy_detail": "%assistentmanagerdepotvacancydetail"
          }
        },
        {
          "condition": "accountmanager",
          "blueprints": {
            "vacancy_detail": "%accountmanagervacancydetail"
          }
        },
        {
          "condition": "accountmanager bouwprojecten",
          "blueprints": {
            "vacancy_detail": "%accountmanagervacancydetail"
          }
        },
        {
          "condition": "klantenadviseur",
          "blueprints": {
            "vacancy_detail": "%cccvacancydetail"
          }
        },
        {
          "condition": "live chat & social media adviseur",
          "blueprints": {
            "vacancy_detail": "%cccvacancydetail"
          }
        },
        {
          "condition": "allround klantenadviseur",
          "blueprints": {
            "vacancy_detail": "%cccvacancydetail"
          }
        },
        {
          "condition": "regiomanager",
          "blueprints": {
            "vacancy_detail": "%accountmanagervacancydetail"
          }
        },
        {
          "condition": "areamanager",
          "blueprints": {
            "vacancy_detail": "%areamanagervacancydetail"
          }
        },
        {
          "condition": "districtmanager",
          "blueprints": {
            "vacancy_detail": "%districtsmanagervacancydetail"
          }
        },
        {
          "condition": "regio accountmanager",
          "blueprints": {
            "vacancy_detail": "%areaaccountmanagervacancydetail"
          }
        },
        {
          "condition": "area accountmanager",
          "blueprints": {
            "vacancy_detail": "%areaaccountmanagervacancydetail"
          }
        },
        {
          "condition": "key accountmanager",
          "blueprints": {
            "vacancy_detail": "%keyaccountmanagervacancydetail"
          }
        },
        {
          "condition": "shop adviseur",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "shop advisor",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "commercieel technische buitendienst medewerker",
          "blueprints": {
            "vacancy_detail": "%salescountervacancydetail"
          }
        },
        {
          "condition": "terrein medewerker",
          "blueprints": {
            "vacancy_detail": "%bouwplaatsinrichtingmonteurvacancydetail"
          }
        },
        {
          "condition": "logistiek medewerker",
          "blueprints": {
            "vacancy_detail": "%bouwplaatsinrichtingmonteurvacancydetail"
          }
        },
        {
          "condition": "service terreinmedewerker",
          "blueprints": {
            "vacancy_detail": "%bouwplaatsinrichtingmonteurvacancydetail"
          }
        },
        {
          "condition": "finance trainee",
          "blueprints": {
            "vacancy_detail": "%financetraineevacancydetail"
          }
        },
        {
          "condition": "supply chain planner",
          "blueprints": {
            "vacancy_detail": "%spplannervacancydetail"
          }
        }
      ],
      "work_area": [
        {
          "condition": "Techniek",
          "blueprints": {
            "vacancy_detail": "%monteurspecialsvacancydetail"
          }
        },
        {
          "condition": "Marketing",
          "blueprints": {
            "vacancy_detail": "%marketingvacancydetail"
          }
        },
        {
          "condition": "IT",
          "blueprints": {
            "vacancy_detail": "%itvacancydetail"
          }
        },
        {
          "condition": "Sales",
          "blueprints": {
            "vacancy_detail": "%salesvacancydetail"
          }
        },
        {
          "condition": "Logistiek & Transport",
          "blueprints": {
            "vacancy_detail": "%driverspecialsvacancydetail"
          }
        },
        {
          "condition": "Hoofdkantoor",
          "blueprints": {
            "vacancy_detail": "%headquartersvacancydetail"
          }
        },
        {
          "condition": "Facilitair",
          "blueprints": {
            "vacancy_detail": "%facilityvacancydetail"
          }
        },
        {
          "condition": "Finance",
          "blueprints": {
            "vacancy_detail": "%financevacancydetail"
          }
        },
        {
          "condition": "HR",
          "blueprints": {
            "vacancy_detail": "%hrvacancydetail"
          }
        },
        {
          "condition": "Administratief",
          "blueprints": {
            "vacancy_detail": "%administrativevacancydetail"
          }
        },
        {
          "condition": "Commercieel",
          "blueprints": {
            "vacancy_detail": "%administrativevacancydetail"
          }
        }
      ],
      "default": [
        {
          "condition": "",
          "blueprints": {
            "vacancy_detail": "%defaultvacancydetail"
          }
        }]
    })
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
       <Button
          onClick={handleClick}
          buttonType="secondary"
          icon="v2-FullPageApp"
          size="small"
          version="v2">
          Open Blueprint Matcher Editor
       </Button>
     </div>
   </div>
 );
}

export default App;
