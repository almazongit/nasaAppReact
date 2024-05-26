import {RoverPhoto} from "./RoverPhoto";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from 'react-helmet';
import MaskedInput from 'react-text-mask';

export const Rover = () => {
    const [date, setDate] = useState('2020-05-05');
    const [photos, setPhotos] = useState([]);
    const [isVisible, setIsVisible] = useState('false');

    const reverseDate = (date) => {
        let parts = date.split('-');
        date = parts[2] + '-' + parts[1] + '-' + parts[0];
        return date
    }
    const updateDate = (e) => {
        e.preventDefault();
        let dateFromInput = reverseDate(e.target[0].value);
        setDate(dateFromInput);
    };

    const FetchPhotoFromApi = (date) => {
        const apiKey = 'CCzpixoLyMPRK216VVNBYcLUcK84N7mPqtUTu7Ui';
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {setPhotos(data.photos); setIsVisible(true)})
            .catch((error) => {console.error('Ошибка при получении данных:', error); setPhotos([])});
    };

    useEffect(() => {
        setIsVisible(false);
        FetchPhotoFromApi(date);
    }, [date]);


    return (
        <>
            <Helmet>
                <title>Diamond and NASA | ROVER</title>
            </Helmet>
            <Container>
                <div className="rover">
                    <div className="rover_header">
                        <h1>Mars Rover Photos</h1>
                        <p>Марсоходы NASA Curiosity, Opportunity и Spirit исследуют Марс уже второй год и предоставляют изображения планеты.
                            У каждого марсохода есть свой набор фотографий, хранящихся в базе данных, которые можно запросить отдельно.
                            Также можно посмотреть более подробную информацию в каждой картинке</p>
                    </div>
                    <span>Введите дату и посмотрите фото с Марса этого дня:</span>

                    <form className="send-day" onSubmit={updateDate}>
                        <MaskedInput className="input-date" mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="__-__-____" />
                        <input className="input-submit" type="submit" />
                    </form>

                    <div className="rover-photos container d-flex flex-column">
                        {
                            photos && photos.length > 0 ? (isVisible && photos.slice(0,10).map((photo, index) => (<RoverPhoto key={index} photo={photo} />))) :
                                (<><p>Фото на такую дату не найдены. Возможно, они отсутствуют, вводите дату от 2018 года </p></>)
                        }
                    </div>
                </div>
            </Container>
        </>
    );
};

