import "./AccountSidebar.css";

import { useContext } from "react";

//assets
import blankImage from "../../assets/common/blank.png";
import settings_icon from "../../assets/accountSidebar/settings_icon.png";

//constants
import COMPONENT_STATE from "../../constants/myAccountComponentStates.js";

//contexts
import { functionalityElementContext } from "../../pages/Home/loggedUser/HomePageLogged.js";

export default function AccountSidebar() {
    const setFunctionalityElement = useContext(functionalityElementContext);

    return (
        
        <div className="home-page-desktop-logged-sidebar flex-column-center-center">
            <div className="home-page-desktop-logged-header">Moje konto</div>
            <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.COCKPIT)}>Kokpit</p>
                <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.COCKPIT)} src={blankImage} alt="cockpit" />
            </div>
            <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.RECOMMENDATION)}>Rekomendacje</p>
                <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.RECOMMENDATION)} src={blankImage} alt="recommendations" />
            </div>
            <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.MY_PLANTS)}>Moje rośliny</p>
                <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.MY_PLANTS)} src={blankImage} alt="my plants" />
            </div>
            <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.BADGES)}>Odznaki</p>
                <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.BADGES)} src={blankImage} alt="badges" />
            </div>
            <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.SETTINGS)}>Ustawienia</p>
                <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.SETTINGS)} src={settings_icon} alt="settings" />
            </div>
        </div>
    )
}