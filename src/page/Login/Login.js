import React, {useState} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {toast} from "react-toastify";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
//import {faSchool} from "@fortawesome/free-solid-svg-icons"
import "./Login.scss";
import {Logo} from "../../assets/png/logo100.png";
import BasicModal from "../../components/Modal/BasicModal";
import SignInForm from "../../components/SignInForm";

export default function Login(props) {
    const {setRefreshCheckLogin} = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    const openModal = content => {
        setShowModal(true);
        setContentModal(content)
    };

    return(
        <>
            <Container className="login" fluid>
                <Row>
                    <LeftComponent/>
                    <RightComponent
                        openModal={openModal}
                        setShowModal={setShowModal}
                        setRefreshCheckLogin={setRefreshCheckLogin}
                    />
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

function LeftComponent() {
    return(
            <Col className="login__left" xs={4}>
                <div>
                    <h2>Sistema de alarmas.</h2>
                    <h3>La seguridad te acompaña xd.</h3>
                </div>
            </Col>
    )
}

function RightComponent(props) {
    const {openModal, setShowModal, setRefreshCheckLogin} = props;
    return(
        <Col className="login__right" xs={8}>
            <div>
                <h2>Iniciar Sesión</h2>
                <h3></h3>
                <Button variant="primary"
                onClick={() => openModal(<SignInForm setShowModal={setShowModal} setRefreshCheckLogin={setRefreshCheckLogin}/>)}
                >
                    Iniciar Sesión
                </Button>
            </div>
        </Col>
    );
}