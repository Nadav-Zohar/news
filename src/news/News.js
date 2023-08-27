import { useContext, useEffect, useState } from "react";
import "./News.css";
import { GeneralContext } from "../App";
import Card from "./Card";

export default function News(){
    const [news, setNews]= useState([]);
    const {setIsLoader, snackbar}= useContext(GeneralContext);
    
    useEffect(() => {
        fetch(`https://api.shipap.co.il/articles?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`)
        .then(res => res.json())
        .then(data => {
            setNews(data);
            snackbar("showing all the news")
        });
    }, []);
    
    return(
        <>
            <div className="news">
                {
                    news.map(a => 
                        <Card key={a.id} article={a} />
                    )
                }
            </div>
        </>
    )
}