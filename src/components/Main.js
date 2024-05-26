import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Helmet } from 'react-helmet';


export const Main = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const toRotate = [ "APOD NASA", "EPIC NASA", "ROVER NASA" ];

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, 500);

        return () => { clearInterval(ticker) };
    })

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
        }
    }

    return (
        <>
            <Helmet>
                <title>Diamond and NASA | Главная страница</title>
            </Helmet>
        <section className="banner" id="main">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                            {
                                ({ isVisible }) =>
                                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                        <h1>Diamond and Nasa <span className="txt-rotate"><span className="wrap">{text}</span></span></h1>
                                        <p>Добро пожаловать на сайт "Diamond and NASA"! Здесь  вы сможете окунуться в мир научных открытий и миссий NASA.
                                            Просматривайте захватывающие фотографии космоса в разделе APOD, узнавайте о миссиях космического аппарата DSCOVR в EPIC,
                                            и исследуйте поверхность Марса вместе с марсоходами NASA в разделе Mars Rover Photos.
                                            Путешествие по страницам "Diamond and Nasa" открывает перед посетителями увлекательный мир космических открытий,
                                            вдохновляя на новые открытия и погружение в тайны бескрайнего космоса.</p>
                                        <div className="banner_links">
                                            <a href="/apod">APOD (Astronomy Picture of the Day) - Удивительные фотографии космоса, обновляемые ежедневно.</a>
                                            <a href="/epic">EPIC (Earth Polychromatic Imaging Camera) - Информация о снимках Земли, сделанных камерой EPIC с космической орбиты.</a>
                                            <a href="/rover">Mars Rover Photos - Фотографии поверхности Марса, сделанные марсоходами NASA Curiosity, Opportunity и Spirit.</a>
                                        </div>
                                    </div>
                            }
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                    <img src={headerImg} alt="Header Img"/>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    )
};
