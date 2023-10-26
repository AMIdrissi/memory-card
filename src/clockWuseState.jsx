import { useEffect, useState } from "react";

function ClockTimer() {
    
    const [timer , setTimer] = useState(0);

    setTimeout(() => {
        setTimer(timer + 1)
    }, 1000)
    
    return (
        <div>
            <h1 style={{color: timer % 2 ? "red" : "white"}}>{timer} seconds passed</h1>
        </div>
    )
}



// ! IMPORTANT : modifying the state during the render IS NOT GOOD , we always have to use an eventListener of some sort so that then after the trigger of the event the the action is also triggered
// as you may have seen here the issue is that the timer does not work as intended it is instead fucked up

// useEffect has 2 main things , the callback and the dependencie array 
// to solve the useEffect repeating twice (due to purity of react) we have to clean/umount the effect

// this might sound strange but it is like cleaning your own shit instead of the 

// strinctMode is the guilty bastard here for running the code twice , but it does that for reson to check for bugs 

export default ClockTimer;