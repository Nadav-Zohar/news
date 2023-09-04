import React, { useContext, useState } from 'react';
import { GeneralContext } from '../App';

export default function TalkbacksForm({ articleId, added, parentId }) {
    const [formData, setFormData] = useState({
        name: '',
        comment: '',
    });

    const { snackbar, setIsLoader } = useContext(GeneralContext);

    function addComment(ev) {
        ev.preventDefault();
        setIsLoader(true);

        fetch(`https://api.shipap.co.il/articles/${articleId}/talkbacks?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                articleId,
                parent: parentId || 0,
            }),
        })
        .then(res => res.json())
        .then(data => {
            data.children = [];
            added(data);
            setIsLoader(false);
            snackbar("comment added");

            setFormData({
                name: '',
                comment: '',
            });
        });
    }

    const handelInput = ev => {
        const { name, value } = ev.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div className='TalkbacksForm block'>
            <form onSubmit={addComment}>
                <input type="text" name="name" placeholder='full name' value={formData.name} onChange={handelInput} required />
                <textarea name="comment" placeholder='comment' cols="30" rows="10" required value={formData.comment} onChange={handelInput}></textarea>
                <button>Send Comment</button>
            </form>
        </div>
    )
}