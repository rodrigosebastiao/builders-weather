interface ISystemUpdating {
    message: string
    updating: boolean
}

export default function SystemUpdating({updating, message}: ISystemUpdating){
    return(
        <span className={`system__updating`} style={{visibility: `${updating ? "visible": "hidden"}`}}>
            {message}
        </span>
    );
}