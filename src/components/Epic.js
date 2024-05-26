import EPICPhoto from "./EPICPhoto";
import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import {Stars} from './Stars';
import { Helmet } from 'react-helmet';
import MaskedInput from 'react-text-mask';


export const Epic = () => {
    const reverseDate = (date) => {
        let parts = date.split('-');
        date = parts[2] + '-' + parts[1] + '-' + parts[0];
        return date
    }
    const day = () => {
        const today = new Date();
        const yesterday = new Date(today.getTime() - (48 * 60 * 60 * 1000));
        let formattedDate = yesterday.toISOString().slice(0, 10);
        return formattedDate;
    }
    
    const formattedDate = day();
    const [isVisible, setIsVisible] = useState('false');
    const [date, setDate] = useState(formattedDate);
    const [data, setData] = useState([]);

    const updateDate = (e) => {
        e.preventDefault();
        let dateFromInput = reverseDate(e.target[0].value);
        setDate(dateFromInput);
    };

     const FetchPhotoFromApi = (date) => {
        const apiKey = 'CCzpixoLyMPRK216VVNBYcLUcK84N7mPqtUTu7Ui';
        fetch(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => { setData(data); setIsVisible(true)})
            .catch(error => console.error('Ошибка при получении данных:', error));
    };

    useEffect(() => {
        setIsVisible(false);
        FetchPhotoFromApi(date);
      }, [date]);



    return (
        <>
            <Helmet>
                <title>Diamond and NASA | EPIC </title>
            </Helmet>
        <Container>
            <div className="epic">
                <div className="epic_header">
                    <h1>EPIC (Earth Polychromatic Imaging Camera) </h1>
                    <p>Камера Earth Polychromatic Imaging Camera (EPIC) представляет собой 10-канальный спектрорадиометр (317 – 780 нм) на борту космического
                        аппарата Deep Space Climate Observatory (DSCOVR).
                        EPIC предоставляет цветные изображения всей освещенной стороны Земли как минимум раз в два часа с расстояния в 1 миллион миль.
                        Эта точка называется точкой Лагранжа Земля-Солнце-1 (L-1), где гравитационное притяжение Земли и Солнца эквивалентны и удерживают
                        обсерваторию на месте.</p>
                </div>
                <span>Введите дату и посмотрите фото Земли этого дня:</span>

                <form className="send-day" onSubmit={updateDate}>
                    <MaskedInput className="input-date" mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="__-__-____" />
                    <input className="input-submit" type="submit" />
                </form>

                <div className="container epic-photos d-flex flex-column">
                        {
                             data && data.length > 0 ? (isVisible && data.map((photo, index) => (<EPICPhoto key={index} photo={photo} />))) : (<><p>Фото на такую дату не найдены. Возможно, они отсутствуют, вводите дату от 2015 года </p><Stars/></>)
                        }
                </div>

            </div>
        </Container>
            </>
    );
};