import "./Settings.scss";
import ThemeBackground from "../ThemeBackground";


interface ISettings {
    isUnitMetric: string
    activeLang: string
    currentLanguage: Object
    languageListOptions: Array<any>
    handleLanguage: (lang: string)=>void
    handleUnitSystem: (unit?: string | undefined) => void
}


export default function Settings({
    currentLanguage,
    isUnitMetric, 
    activeLang, 
    languageListOptions, 
    handleUnitSystem, 
    handleLanguage
}: ISettings) {


    return (
        <div className="settings">
            <ThemeBackground />

            <ul className="settings__languages">
                {languageListOptions.map((lang: any)=>{
                    return (
                        <li 
                            key={lang.id}
                            className={`language ${lang.id} ${activeLang === lang.id ? "language--active" : ""}`}
                            onClick={()=>handleLanguage(lang.id)}
                        >
                            {lang.prop.name}
                        </li>
                    )
                })}
            </ul>

            <div className="settings__units">
                <span className={`imperial ${isUnitMetric ? "" : "active"}`} onClick={()=>handleUnitSystem("imperial")}>°F</span>
                <span className="separator"> / </span>
                <span className={`metric ${isUnitMetric ? "active" : ""}`} onClick={()=>handleUnitSystem("metric")}>C°</span>
            </div>
        </div>
    )
}