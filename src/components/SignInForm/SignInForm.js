import React, {useState} from "react";
import "./SignInForm.scss";
import {values, size} from "lodash";
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import {isEmailValid} from "../../utils/validations";
import {signInApi} from "../../api/auth";
import {setTokenApi} from "../../api/auth";

export default function SignInForm(props) {
    const {setRefreshCheckLogin} = props;
    const  {setShowModal} = props;
    const [formData, setFormData] = useState(initialFormValue);
    const [signInLoading, setSignInLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        //console.log(formData);

        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        });

        //console.log(validCount);
        console.log(size(formData))

        if(validCount != size(formData)){
            toast.warning("Completa todos los campos del formulario.")
        }else{
            if(!isEmailValid(formData.email)){
                toast.warning("Email invalido")
            }else if(size(formData.password)< 8){
                toast.warning("La contraseña debe ser de al menos 8 caracteres.")
            }else{
                setSignInLoading(true);
                signInApi(formData).then(response => {
                    if(response.message){
                        toast.warning(response.message);
                    }else{
                        setTokenApi(response.token);
                        setRefreshCheckLogin(true)
                        toast.success("Bienvenido!");
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                }).catch(() => {
                    toast.error("Error del servidor, intente de nuevo");
                }).finally(() => {
                    setSignInLoading(false);
                });
            }
        }
    };

    //este onChange unicamente funciona para formularios input
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return(
        <div className="sign-in-form">
            <h2>Iniciar sesion</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control name="email" type="email" placeholder="Correo" defaultValue={formData.email}
                            />
                        </Col>
                        <Col>
                            <Form.Control name="password" type="password" placeholder="Contraseña"
                                          defaultValue={formData.password}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signInLoading ? "Iniciar Sesión" : <Spinner animation="border" />}
                </Button>
            </Form>
        </div>
    );
}

function initialFormValue() {
    return{
        email: "",
        password: "",
    }
}