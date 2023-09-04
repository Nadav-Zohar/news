import './News.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Talkbacks from '../components/Talkbacks';
import Loader from '../components/Loader';
import { GeneralContext } from '../App';
import Snackbar from "../components/Snackbar"

export default function NewsPage() {
    const [article, setArticle] = useState();
    const {id} =useParams();
    const { isLoader, setIsLoader, snackbarText}= useContext(GeneralContext);

    useEffect(() => {
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/articles/${id}?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`)
        .then(res => res.json())
        .then(data => {
            setArticle(data);
            setIsLoader(false);
        });
    }, []);

    return (
        <>
            <div className='NewsPage'>
                {
                    article ?
                    <div className='article'>
                        <Link to={'/'}>Go Back</Link>
                        <h3>{article.headline}</h3>
                        <p>{article.description}</p>
                        <img src={article.imgUrl} width="100%" alt='article img' />
                        <p>{article.content}</p>
                        <Talkbacks articleId={id} />
                    </div> :
                    <p className='article'>טוען...</p>
                }
                {isLoader && <Loader />}
                {snackbarText && <Snackbar text={snackbarText}/>}
            </div>
        </>
    )
}