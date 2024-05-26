import {FetchedPhoto} from "./FetchedPhoto";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MaskedInput from 'react-text-mask';
import { Helmet } from 'react-helmet';


export const Apod = () => {

    const reverseDate = (date) => {
        let parts = date.split('-');
        date = parts[2] + '-' + parts[1] + '-' + parts[0];
        return date
    }
    const today = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
        const year = today.getFullYear();
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        return formattedDate;
    }

    const formattedDate = today();
    const [isVisible, setIsVisible] = useState('false');
    const [date, setDate] = useState(formattedDate);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);


    const updateDate = (e) => {
        e.preventDefault();
        let dateFromInput = reverseDate(e.target[0].value);
        if (dateFromInput <= formattedDate) {
            setDate(dateFromInput);
            setError(false);
        }
        else {
            setError(true);
        }

    };

    const FetchPhotoFromApi = (date) => {
        const apiKey = 'CCzpixoLyMPRK216VVNBYcLUcK84N7mPqtUTu7Ui';
        fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => { setData(data); setIsVisible(true)})
            .catch(error => {console.error('Ошибка при получении данных:', error); setData([]);});
    };

    useEffect(() => {
        setIsVisible(false);
        FetchPhotoFromApi(date);
      }, [date]);

    return (
        <>
            <Helmet>
                <title>Diamond and NASA | APOD</title>
            </Helmet>
            <Container>
                <div className="apod">
                    <div className="apod_header">
                        <h1>APOD (Astronomy Picture of the Day)</h1>
                        <p>Это веб-сайт, поддерживаемый NASA и Мичиганским технологическим университетом. По данным самого сайта на нём «каждый день
                            публикуется изображение или фотоснимок из нашей Вселенной, а также краткое пояснение к нему, написанное профессиональным астрономом». </p>
                    </div>
                    <span>Введите дату и посмотрите астрономическое фото этого дня:</span>
                    <form className="send-day" onSubmit={updateDate}>
                        <MaskedInput className="input-date" mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="__-__-____" />
                        <input className="input-submit" type="submit" />
                    </form>
                    <div>
                        {
                            (data.length === 0 || error) ? <><p>Данные не найдены, возможно ошибка запроса</p></> : (isVisible && <FetchedPhoto data={data}/>) 
                        }
                    </div>

                    
                </div>
            </Container>
        </>
    );
};