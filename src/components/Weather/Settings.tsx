
interface ISettings {
    languages: any
    languageOptions: Array<any>
    handleLanguage: (lang: string)=>void
}



export default function Settings({languageOptions, languages, handleLanguage}: ISettings) {
    return (
    <ul className="weather__settings">
        <li className="weather__settings__languages">
            <ul>
                {languageOptions.map((lang: any)=>{
                    return (
                        <li 
                            key={lang.id}
                            className={`language__${languages.active === lang.id? "active" : ""}`}
                            onClick={()=>handleLanguage(lang.id)}
                            >
                            {lang.prop.name}
                        </li>
                    )
                })}
            </ul>
        </li>
    </ul>
    )
}