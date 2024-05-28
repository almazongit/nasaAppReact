import React from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';

 export const FetchedPhoto = ({data}) => {
    // Проверяем, есть ли объект photo и не является ли он пустым
    if (!data || !data.url) {
        return <div>Ошибка в получении данных, возможно они еще не загружены.</div>;
    }

    return (
            <div className="fetched-photo">
                <div className="photo-text">
                    {data.url.includes('youtube.com') ? <iframe width="640" height="480" title="video content" src={data.url} allowfullscreen /> : <img alt={data.title} src={data.url} /> }
                    <div className="text">
                        <h3>{data.title}</h3>
                        <p>{data.explanation}</p>
                    </div>
                </div>
            </div>
    );
};

