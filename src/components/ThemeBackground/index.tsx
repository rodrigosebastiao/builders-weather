import { useContext } from "react";
import {WeatherContext} from "../contexts/WeatherProvider";
import {SET_THEME} from "../contexts/reducers";

interface IThemeBackground {
    activeTheme: string
    themes: Array<string>
}

export default function ThemeBackground(){
    const [state, dispatch]: any = useContext(WeatherContext);
    const {themes, activeTheme}: IThemeBackground = state;


    const handleTheme = (selectedTheme?: string | null, direction?: "+" | "-") => {
        if(selectedTheme){
            /* Set by string */
            dispatch({ type: SET_THEME, payload: selectedTheme});
        } else {
            /* Set by Prev/Next*/
            const currentIndex = themes.findIndex(theme=>theme === activeTheme);            

            
            if(direction === "-"){
                if(currentIndex >= 0){
                    let prev = currentIndex - 1;
                    if(currentIndex === 0){
                        //is first go to laast
                        prev = themes.length - 1;
                    }
                    const prevTheme = themes[prev];
                    dispatch({ type: SET_THEME, payload: prevTheme});
                }
            }
            if(direction === "+"){
                if(currentIndex <= themes.length - 1){
                    let next = currentIndex + 1;
                    if(currentIndex === themes.length - 1){
                        //is last go to first
                        next = 0;
                    }
                    const nextTheme = themes[next];
                    dispatch({ type: SET_THEME, payload: nextTheme});
                }
            }
        }
        // document.body.classList.add(selectedTheme);
    }

    const nameAdjusted = (name: string) => {
        const themeName = name.replace("-", " ");
        return themeName;
    }
    
    return(
        <div className="settings__themes">
            <button className="settings__themes-button prev" onClick={()=>handleTheme(null, "-")}> 
                <i className="fas fa-chevron-left"></i>
            </button>
             <div className="theme__list-wrapper">
                <ul className="theme__list">
                    {themes.map((themeName, index)=>{
                        const isActive = themeName === activeTheme;
                        return(
                            <li 
                                key={themeName + index} 
                                className={`theme ${isActive ? "theme--active" : ""}`}
                                onClick={()=>handleTheme(themeName)}>
                                {nameAdjusted(themeName)}
                            </li> 
                        )
                    })}
                </ul>
             </div>
            <button className="settings__themes-button next" onClick={()=>handleTheme(null, "+")}> 
                <i className="fas fa-chevron-right"></i>
             </button>
        </div>
    );
}