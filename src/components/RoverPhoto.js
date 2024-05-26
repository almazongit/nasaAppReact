import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const RoverPhoto = ({ photo }) => {
    const { img_src, camera, rover, sol, earth_date } = photo;
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title className="header d-flex align-items-center justify-content-between">
                        <h1>{camera.full_name}</h1>
                        <Button variant="secondary" onClick={handleCloseModal}>Закрыть</Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="text-center mb-5">Название марсохода: {rover.name}</h3>
                    <div className="photo-text d-flex align-items-start justify-content-between">
                        <div className="d-flex flex-column gap-4">
                            <span>Отправка с Земли: {rover.launch_date}</span>
                            <span>Дата прилета: {rover.landing_date}</span>
                            <span>Сол (Солнечный день на Марсе): {sol}</span>
                            <span>Кол-во сделанных фото за все время: {rover.total_photos}</span>
                            <span>Дата на земле: {earth_date}</span>
                        </div>
                        <img src={img_src} alt='' />
                    </div>

                </Modal.Body>
            </Modal>

            <div className="rover-photo" onClick={handleOpenModal}>
                <span>{earth_date}</span>
                <LazyLoadImage effect="blur" src={img_src} alt='' />
            </div>
        </div>
    );
};

export default RoverPhoto;
