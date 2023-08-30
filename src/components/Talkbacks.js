import { useContext, useEffect, useState } from "react";
import "./Talkbacks.css";
import { GeneralContext } from "../App";
import { useParams } from "react-router-dom";

export default function Talkbacks(){
    const [talkBacks, setTalkBacks]= useState([]);
    const {snackbar, setIsLoader}= useContext(GeneralContext);
    const {id}= useParams();
    const [sendTalkback, setSendTalkback]= useState(
        {
            articleId: `${id}`,
            parent: 0,
            name: "",
            comment: ""
        }
    );
    
    useEffect(() => {
        fetch(`https://api.shipap.co.il/articles/${id}/talkbacks?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`)
        .then(res => res.json())
        .then(data => {
            setTalkBacks(data);
        });
    }, [talkBacks]);

    const inputChange = ev => {
        const { name, value } = ev.target;

        setSendTalkback({
            ...sendTalkback,
            [name]: value,
        });
    }

    const postTalkback = ev => {
        ev.preventDefault();

        fetch(`https://api.shipap.co.il/articles/${id}/talkbacks?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(sendTalkback),
        })
        .then(res => res.json())
        .then(data => {

        });

    }

    return(
        <>
        <div className="talkback-flex">
            <div className="talkbacks-Container">
                {
                    talkBacks.map((t, i) => 
                        <div key={i + 1}>
                            <h3>{t.name}</h3>
                            <p>{t.comment}</p>
                        </div>
                    )
                }
            </div>
            <div className="talkbacks-text-area">
                <form onSubmit={postTalkback}>
                    <label>
                        Your Name :
                        <input type="text" name="name" value={sendTalkback.name} onChange={inputChange}/>
                    </label>
                    <label>
                        <textarea type="text" name="comment" value={sendTalkback.comment} onChange={inputChange}/>
                    </label>
                    <button type="submit">Add Comment</button>
                </form>
            </div>
        </div>
        </>
    )
}