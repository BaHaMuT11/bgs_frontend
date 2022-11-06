import React, {useContext, useState} from "react"
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx"
import Swal from "sweetalert2"
import axios from "axios"
import "./edit_personal_info.scss"
import {URL_MODIFICAR_CREDENCIALES, URL_REGISTRAR_USUARIO} from "../../services/auth.js"
import {useNavigate} from "react-router-dom";

const EditPersonalInfo = () => {

    const { modCredenciales, setModCredenciales, mostrarEditInfoUser,
            setMostrarEditInfoUser, ntk, setAutenticado} = useContext(UserContext)

    const [emailSet, setEmailSet] = useState({emailDos: "",
        emailText:"",
        emailHidden: true})
    const [passwordSet, setPasswordSet] = useState({ passwordDos: "",
        passwordText: "",
        passwordHidden: true})

    const [submitDisabledStatus, setSubmitDisabledStatus] = useState(true)
    const [chosenCredential, setChosenCredential] = useState("")

    const navigate = useNavigate()

    const handleChangePasswordDos = (pswDos) => {
        if (pswDos != modCredenciales.pass || pswDos.length < 7)  {
            setPasswordSet({...passwordSet, passwordDos: pswDos,
                passwordText: "Ambas contraseñas deben ser iguales y tener 7 " +
                    "o más caracteres",
                passwordHidden: false})
            setSubmitDisabledStatus(true)
        } else {
            setPasswordSet({...passwordSet, passwordDos: pswDos,
                passwordText: "Perfecto",
                passwordHidden: true})
            setSubmitDisabledStatus(false)
        }
    }
    const handleChangeEmailDos = (emailDos) => {
        if (emailDos != modCredenciales.correo || emailDos.length < 5)  {
            setEmailSet({...emailSet, emailDos: emailDos,
                emailText: "Ambos correos deben ser iguales y tener 5 o más caracteres",
                emailHidden: false})
            setSubmitDisabledStatus(true)
        } else {
            setEmailSet({...emailSet, emailDos: emailDos,
                emailText: "Perfecto",
                emailHidden: true})
            setSubmitDisabledStatus(false)
        }
    }

    const handleModInfoSubmit = (e) => {

        e.preventDefault()

        if (chosenCredential === "1") {
            if (!modCredenciales.pass.trim()) {
                Swal.fire(
                    'Whooooops',
                    "Debe ingresar todos los campos obligatorios",
                    'error'
                )
                return
            }

            if (modCredenciales.pass != passwordSet.passwordDos) {
                Swal.fire(
                    'Whooooops',
                    "Las contraseñas de ambos campos deben ser las mismas",
                    'error'
                )
                setModCredenciales({...modCredenciales, pass: ""})
                setPasswordSet(({...passwordSet, passwordDos: "", passwordText: ""}))
                return
            }

            if (modCredenciales.pass.length < 7) {
                Swal.fire(
                    'Whooooops',
                    "La contraseña debe tene al menos 7 caracteres",
                    'error'
                )
                setModCredenciales({...modCredenciales, pass: ""})
                setPasswordSet(({...passwordSet, passwordDos: "", passwordText: ""}))
                return
            }

            const modificarPass = async () => {
                try {
                    let request = {
                        login: modCredenciales.login,
                        correo: "",
                        pass: modCredenciales.pass,
                    }

                    const configuracionModCredenciales = {
                        headers: {
                            "Content-Type": "Application/JSON",
                            "Authorization": "Bearer " + ntk
                        }
                    }
                    const {data} = await axios.put(URL_MODIFICAR_CREDENCIALES, request, configuracionModCredenciales)

                    if (data.estado.codigo = "200") {
                        Swal.fire(
                            'Excelente',
                            'Modificación realizada',
                            'success'
                        )
                        setModCredenciales({
                            login: "",
                            pass: "",
                            correo: ""
                        })
                        setAutenticado(false)
                        setMostrarEditInfoUser(false)
                        navigate("/authenticate")
                    } else {
                        setModCredenciales({...modCredenciales, pass: ""})
                        setPasswordSet(({...passwordSet, passwordDos: "", passwordText: ""}))
                        Swal.fire(
                            'Algo no salió bien',
                            'Revise sus datos y realice la solicitud nuevamente',
                            'error'
                        )
                    }
                }
                catch (error) {
                    setModCredenciales({...modCredenciales, pass: ""})
                    setPasswordSet(({...passwordSet, passwordDos: "", passwordText: ""}))
                    Swal.fire(
                        'Qué mal :(',
                        'No se pudo completar su solicitud',
                        'error'
                    )
                }
            }
            modificarPass()
        } else if (chosenCredential === "2") {
            if (!modCredenciales.correo.trim()) {
                Swal.fire(
                    'Whooooops',
                    "Debe ingresar todos los campos obligatorios",
                    'error'
                )
                return
            }

            if (modCredenciales.correo != emailSet.emailDos) {
                Swal.fire(
                    'Whooooops',
                    "Los correos de ambos campos deben ser los mismos",
                    'error'
                )
                setModCredenciales({...modCredenciales, correo: ""})
                setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
                return
            }

            if (modCredenciales.correo.length < 5) {
                Swal.fire(
                    'Whooooops',
                    "El correo debe tener un mínimo de 5 caracteres",
                    'error'
                )
                setModCredenciales({...modCredenciales, correo: ""})
                setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
                return
            }

            const modificarCorreo = async () => {
                try {
                    let request = {
                        login: modCredenciales.login,
                        correo: modCredenciales.correo,
                        pass: "",
                    }

                    const configuracionModCredenciales = {
                        headers: {
                            "Content-Type": "Application/JSON",
                            "Authorization": "Bearer " + ntk
                        }
                    }
                    const {data} = await axios.put(URL_MODIFICAR_CREDENCIALES, request, configuracionModCredenciales)

                    if (data.estado.codigo = "200") {
                        Swal.fire(
                            'Excelente',
                            'Modificación realizada',
                            'success'
                        )
                        setModCredenciales({
                            login: "",
                            pass: "",
                            correo: ""
                        })
                        setAutenticado(false)
                        setMostrarEditInfoUser(false)
                        navigate("/authenticate")
                    } else {
                        setModCredenciales({...modCredenciales, correo: ""})
                        setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
                        Swal.fire(
                            'Algo no salió bien',
                            'Revise sus datos y realice la solicitud nuevamente',
                            'error'
                        )
                    }
                }
                catch (error) {
                    setModCredenciales({...modCredenciales, correo: ""})
                    setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
                    Swal.fire(
                        'Qué mal :(',
                        'No se pudo completar su solicitud',
                        'error'
                    )
                }
            }
            modificarCorreo()
        } else {
            Swal.fire(
                'Pero qué pasó !',
                'Elija una opción válida: correo o contraseña. Inténtelo nuevamente',
                'error'
            )
            return
        }
    }

    const type = "radio"
    const renderForms = () => {
        if (chosenCredential === "1") {
            return (
                <div className="password-fields">
                    <Form.Group className="mb-3" controlId="regPsw">
                        <Form.Label>Contraseña: <span className="text-danger">*</span></Form.Label>
                        <FloatingLabel label="Contraseña" controlId="floatingRegPsw" className="text-dark mb-3">
                            <Form.Control type="password" placeholder="Contraseña"
                                          value={modCredenciales.pass}
                                          onChange={e => setModCredenciales({...modCredenciales, pass: e.target.value})}
                            />
                            <Form.Text className="text-danger" hidden={passwordSet.passwordHidden}>
                                {passwordSet.passwordText}
                            </Form.Text>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regPswRepeat">
                        <Form.Label>Repita la contraseña: <span className="text-danger">*</span></Form.Label>
                        <FloatingLabel label="Repita la contraseña" controlId="floatingRegPswRepeat"
                                       className="text-dark mb-3">
                            <Form.Control type="password" placeholder="Repita la contraseña"
                                          value={passwordSet.passwordDos}
                                          onChange={e => handleChangePasswordDos(e.target.value)}
                            />
                            <Form.Text className="text-danger" hidden={passwordSet.passwordHidden}>
                                {passwordSet.passwordText}
                            </Form.Text>
                        </FloatingLabel>
                    </Form.Group>
                </div>
            )
        }
        else if (chosenCredential === "2") {
            return (
                <div className="email-fields">
                    <Form.Group className="mb-3" controlId="regEmail">
                        <Form.Label>Correo: <span className="text-danger">*</span></Form.Label>
                        <FloatingLabel label="Ej.: nombre@dominio.cl" controlId="floatingRegEmail" className="text-dark mb-3">
                            <Form.Control type="email" placeholder="Email"
                                          value={modCredenciales.correo}
                                          onChange={e => setModCredenciales({...modCredenciales, correo: e.target.value})}
                            />
                            <Form.Text className="text-danger" hidden={emailSet.emailHidden}>
                                {emailSet.emailText}
                            </Form.Text>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regEmailRepeat">
                        <Form.Label>Repita el correo: <span className="text-danger">*</span></Form.Label>
                        <FloatingLabel label="Ej.: nombre@dominio.cl" controlId="floatingRegEmailRepeat" className="text-dark mb-3">
                            <Form.Control type="email" placeholder="Repita el email"
                                          value={emailSet.emailDos}
                                          onChange={e => handleChangeEmailDos(e.target.value)}
                            />
                            <Form.Text className="text-danger" hidden={emailSet.emailHidden}>
                                {emailSet.emailText}
                            </Form.Text>
                        </FloatingLabel>
                    </Form.Group>
                </div>
            )
        } else {
            return ("")
        }
    }
    return (
        <>
            <Modal show={mostrarEditInfoUser}
                   onHide={() => {
                       setMostrarEditInfoUser(false)
                       setChosenCredential("")
                   }}
                   centered
                   className="ec-style"
                   >
                <Modal.Header className="bg-dark text-white"  closeButton>
                    <Modal.Title>Cambiar info de acceso</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white" >
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Cambiar contraseña"
                            name="grupoCredenciales"
                            type={type}
                            id={`inline-${type}-1`}
                            className="text-white"
                            value="1"
                            onChange={ e => setChosenCredential(e.target.value)}
                        />
                        <Form.Check
                            inline
                            label="Cambiar correo"
                            name="grupoCredenciales"
                            type={type}
                            id={`inline-${type}-2`}
                            className="text-white"
                            value="2"
                            onChange={ e => setChosenCredential(e.target.value)}
                        />
                    </div>
                    <Form onSubmit={e => handleModInfoSubmit(e)}>
                        { renderForms() }
                        <Button variant="warning" type="submit" className="w-100" disabled={submitDisabledStatus}>Modificar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditPersonalInfo