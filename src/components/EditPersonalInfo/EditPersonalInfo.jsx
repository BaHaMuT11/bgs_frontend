import React, {useContext, useState} from "react"
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx"
import Swal from "sweetalert2"
import axios from "axios"
import "./edit_personal_info.scss"
import {URL_REGISTRAR_USUARIO} from "../../services/auth.js"

const EditPersonalInfo = () => {

    const {modCredenciales, setModCredenciales, mostrarEditInfoUser, setMostrarEditInfoUser} = useContext(UserContext)

    const [emailSet, setEmailSet] = useState({emailDos: "",
        emailText:"",
        emailHidden: true})
    const [passwordSet, setPasswordSet] = useState({ passwordDos: "",
        passwordText: "",
        passwordHidden: true})
    const [submitDisabledStatus, setSubmitDisabledStatus] = useState(false)

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

        if (!modCredenciales.nombre.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (modCredenciales.nombre.length < 3 || modCredenciales.nombre.length > 50) {
            Swal.fire(
                'Whooooops',
                "El nombre debe tener al menos 3 caracteres",
                'error'
            )
            return
        }

        if (!modCredenciales.usuario.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (modCredenciales.usuario.length < 4 || modCredenciales.usuario.length > 7) {
            Swal.fire(
                'Whooooops',
                "El login debe tener un mínimo de 4 caracteres y un máximo de 7",
                'error'
            )
            return
        }

        if (!modCredenciales.fechaNacimiento.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (modCredenciales.edad < 18) {
            Swal.fire(
                'Whooooops',
                "Debes ser mayor de edad para registrarte",
                'error'
            )
            setmodCredenciales({...modCredenciales, correo: ""})
            setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
            return
        }

        if (!modCredenciales.rut.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (!modCredenciales.fono.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }
        if (!modCredenciales.calle.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }
        if (!modCredenciales.numero.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

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

        const registrarUsuario = async () => {
            try {
                let request = {
                    usuario: modCredenciales.usuario,
                    nombre: modCredenciales.nombre,
                    pass: modCredenciales.pass,
                    fechaNacimiento: modCredenciales.fechaNacimiento,
                    edad: modCredenciales.edad,
                    rut: modCredenciales.rut,
                    fono: modCredenciales.fono,
                    calle: modCredenciales.calle,
                    numero: modCredenciales.numero,
                    casa: modCredenciales.casa,
                    region: modCredenciales.region,
                    comuna: modCredenciales.comuna,
                    correo: modCredenciales.correo,
                    estado: modCredenciales.estado
                }

                const {data} = await axios.post(URL_REGISTRAR_USUARIO, request)

                if (data.estado.codigo = "200") {
                    Swal.fire(
                        'Excelente',
                        'Registro completado',
                        'success'
                    )
                    setModCredenciales({ usuario: "",
                        pass: "",
                        nombre: "",
                        fechaNacimiento: "",
                        edad: "0",
                        rut: "",
                        fono: "",
                        calle: "",
                        numero: "",
                        casa: "",
                        region: "Región Metropolitana de Santiago",
                        comuna: "Santiago",
                        correo: "",
                        estado: "ACTIVO"
                    })
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
                    'Qué mal',
                    'No se pudo completar su solicitud',
                    'error'
                )
            }
        }
        registrarUsuario()
    }

    return (
        <>
            <Modal show={mostrarEditInfoUser}
                   onHide={() => setMostrarEditInfoUser(false)}
                   centered
                   className="ec-style"
                   >
                <Modal.Header className="bg-dark text-white"  closeButton>
                    <Modal.Title>Cambiar info de acceso</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white" >
                    <Form onSubmit={e => handleModInfoSubmit(e)}>
                        <div className="my-5">
                            <Form.Group className="mb-3" controlId="regPsw">
                                <Form.Label>Contraseña: <span className="text-danger">*</span></Form.Label>
                                <FloatingLabel label="Contraseña" controlId="floatingRegPsw" className="text-dark mb-3">
                                    <Form.Control type="password" placeholder="Contraseña"
                                                  value={modCredenciales.pass}
                                                  onChange={e => setModCredenciales({...modCredenciales, pass: e.target.value})} />
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
                        <div className="pb-3">
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
                                                  onChange={e => handleChangeEmailDos(e.target.value)} />
                                    <Form.Text className="text-danger" hidden={emailSet.emailHidden}>
                                        {emailSet.emailText}
                                    </Form.Text>
                                </FloatingLabel>
                            </Form.Group>
                        </div>
                        <Button variant="warning" type="submit" className="w-100" disabled={submitDisabledStatus}>Modificar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditPersonalInfo