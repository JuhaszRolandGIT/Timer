import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
    {targetTTime, remainingTime, onReset}, ref){
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemaningTime = (remainingTime / 1000).toFixed(2)
    const score = Math.round((1 - remainingTime / (targetTTime * 1000)) * 100)
    
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });
    
    return createPortal(
        <dialog ref={dialog} className="result-modal" >
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>the target time was <strong>{targetTTime} seconds</strong></p>
            <p>You stopped the timer with <strong>{formattedRemaningTime} seconds left.</strong> </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ResultModal;