
interface IUpdateButton {
    updateWeather: ()=>void
    buttonText: string
}

export default function UpdateButton({updateWeather, buttonText}: IUpdateButton){
    return(
        <button 
            className="weather__update" 
            onClick={updateWeather}
        >
            {buttonText}
        </button>
    );
}