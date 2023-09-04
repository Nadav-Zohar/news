import { useEffect, useState } from 'react';
import moment from 'moment';
import './Talkbacks.css';
import TalkbacksForm from './TalkbacksForm';

export default function Talkbacks({ articleId, children, level }) {
    const [talkbacks, setTalkbacks] = useState([]);

    useEffect(() => {
        if (children) {
            setTalkbacks(children);
        } else {
            fetch(`https://api.shipap.co.il/articles/${articleId}/talkbacks?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`)
            .then(res => res.json())
            .then(data => {
                data.forEach(t => {
                    t.children = data.filter(c => c.parent === t.id);
                });
    
                setTalkbacks(data.filter(c => c.parent === 0));
            });
        }
    }, []);

    const commentToggle = t => {
        t.isShowComment = !t.isShowComment;
        setTalkbacks([...talkbacks]);
    }

    function addChild(item, parent) {
        parent.children.unshift(item);
        parent.isShowComment = false;
        setTalkbacks([...talkbacks]);
    }

    return (
        <div className='Talkbacks'>
            {!children && <h3>Comments</h3>}
            {!children && <TalkbacksForm articleId={articleId} added={item => setTalkbacks([item, ...talkbacks])} />}
            {
                talkbacks.map((t, i) =>
                    <div key={t.id} style={{ paddingLeft: level ? 20 : 0 }}>
                        <div className='talkbackContainer'>
                            <div className='grid'>
                                <div>
                                    <div className='circle' style={{backgroundColor: 'hsl('+ t.id * 40 +' 48% 47%)'}}>
                                        {t.name.slice(0,1)}
                                    </div>
                                </div>

                                <div>{t.name} <i>({moment(t.time).format('DD/MM/Y H:mm')})</i></div>
                                <div className='btnFrame'>
                                    <button style={{backgroundColor: 'hsl('+ t.id * 40 +' 48% 47%)'}} onClick={() => commentToggle(t)}>comment</button>
                                </div>
                                <div className='content'>{t.comment}</div>
                            </div>

                            {t.isShowComment && <TalkbacksForm articleId={articleId} parentId={t.id} added={item => addChild(item, t)} />}
                        </div>

                        {t.children?.length ? <Talkbacks articleId={articleId} children={t.children} level={(level || 0) + 1} /> : ''}
                    </div>
                )
            }
        </div>
    )
}