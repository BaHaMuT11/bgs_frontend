import React, {useContext, useEffect, useState} from "react"
import "./sign_up.scss"
import {Button, Col, FloatingLabel, Form} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios"
import {URL_OBTENER_INFO_GEOGRAFICA} from "../../services/auth.js"
import {calcularEdad} from "../../util/calcularEdad.js"
import Swal from "sweetalert2"

const SignUp = () => {

    const {regiones, setRegiones, comunas, setComunas,
        regForm, setRegForm, geoToogler, setGeoToogler
    } = useContext(UserContext)
    const [emailSet, setEmailSet] = useState({emailDos: "",
        emailText:"",
        emailHidden: true})
    const [passwordSet, setPasswordSet] = useState({ passwordDos: "",
        passwordText: "",
        passwordHidden: true})
    const [submitDisabledStatus, setSubmitDisabledStatus] = useState(false)

    const handleChangeRegion = (valorSelect) => {
        setRegForm({...regForm, region: valorSelect})
        setGeoToogler(!geoToogler)
    }

    const handleChangeNacimiento = (valorFecha) => {
        setRegForm({...regForm, edad: calcularEdad(valorFecha).toString(), fechaNacimiento: valorFecha.toString()})
    }

    const handleChangePasswordDos = (pswDos) => {
        if (pswDos != regForm.pass || pswDos.length < 7)  {
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
        if (emailDos != regForm.correo || emailDos.length < 5)  {
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


    const handleAddSubmit = (e) => {

        e.preventDefault()

        if (!regForm.nombre.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (!regForm.usuario.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (!regForm.fechaNacimiento.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (!regForm.rut.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (!regForm.pass.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (!regForm.fono.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }
        if (!regForm.calle.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }
        if (!regForm.numero.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }
        if (!regForm.casa.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }
        if (!regForm.correo.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }
        if (!regForm.estado.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }
        if (regForm.correo != emailSet.emailDos) {
            Swal.fire(
                'Whooooops',
                "Los correos de ambos campos deben ser los mismos",
                'error'
            )
            setRegForm({...regForm, correo: ""})
            setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
            return
        }
        if (regForm.pass != passwordSet.passwordDos) {
            Swal.fire(
                'Whooooops',
                "Las contraseñas de ambos campos deben ser las mismas",
                'error'
            )
            setRegForm({...regForm, pass: ""})
            setPasswordSet(({...passwordSet, passwordDos: "", passwordText: ""}))
            return
        }

        Swal.fire(
            'Excelente',
            'Registro completado',
            'success'
        )
    }

    useEffect( ()=>{
        const asignarInfoGeografica = async () => {
            const {data} = await axios.get(URL_OBTENER_INFO_GEOGRAFICA)
            const regiones = data.regiones

            setRegiones(regiones)

            for (const region of regiones) {
                if (region.region === "Región Metropolitana de Santiago") {
                    setComunas(region.comunas)
                    break
                }
            }
        }
        asignarInfoGeografica()
    }, [])

    useEffect(()=>{
        for (const region of regiones) {
            if (region.region === regForm.region) {
                setRegForm({...regForm, comuna: region.comunas[0]})
                setComunas(region.comunas)
            }
        }
    },[geoToogler])

    return (
        <Col className="my-3">
            <h2 className="text-white text-center">REGISTRO</h2>
            <Form className="text-white" onSubmit={e => handleAddSubmit(e)}>
                <Form.Group className="mb-3" controlId="regNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <FloatingLabel label="Nombre completo" controlId="floatingRegNombre" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Nombre completo"
                                      value={regForm.nombre}
                                      onChange={e => setRegForm({...regForm, nombre: e.target.value})}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="regLogin">
                    <Form.Label>Login:</Form.Label>
                    <FloatingLabel label="Login" controlId="floatingRegLogin" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Login"
                                      value={regForm.usuario}
                                      onChange={e => setRegForm({...regForm, usuario: e.target.value})}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="regNacimiento">
                    <Form.Label>Fecha de nacimiento:</Form.Label>
                    <FloatingLabel controlId="floatingRegNacimiento" label="Fecha de nacimiento" className="text-dark">
                        <Form.Control type="date" placeholder="11-11-1985"
                                      onChange={e => handleChangeNacimiento(e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="regRUT">
                    <Form.Label>RUT:</Form.Label>
                    <FloatingLabel label="Ej.: 16587231-K" controlId="floatingRegRUT" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="16587231-K"
                                      value={regForm.rut}
                                      onChange={e => setRegForm({...regForm, rut: e.target.value})}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-5" controlId="regFono">
                    <Form.Label>Fono:</Form.Label>
                    <FloatingLabel label="Ej.: +56 9 4178 8523" controlId="floatingRegFono" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="+56 9 4178 8523"
                                      value={regForm.fono}
                                      onChange={e => setRegForm({...regForm, fono: e.target.value})}/>
                    </FloatingLabel>
                </Form.Group>
                <div className="calle-completa pt-5">
                    <Form.Group className="mb-3" controlId="regCalle">
                        <Form.Label>Calle:</Form.Label>
                        <FloatingLabel label="Calle" controlId="floatingRegCalle" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="Calle"
                                          value={regForm.calle}
                                          onChange={e => setRegForm({...regForm, calle: e.target.value})} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regNumero">
                        <Form.Label>Número:</Form.Label>
                        <FloatingLabel label="Número" controlId="floatingRegNumero"  className="text-dark mb-3">
                            <Form.Control type="text" placeholder="7880. 15-A"
                                          value={regForm.numero}
                                          onChange={e => setRegForm({...regForm, numero: e.target.value})} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regCasa">
                        <Form.Label>Casa/Block/Depto:</Form.Label>
                        <FloatingLabel label="Ej.: 404, Block B" controlId="floatingRegCasa" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="7880. 15-A"
                                          value={regForm.casa}
                                          onChange={e => setRegForm({...regForm, casa: e.target.value})} />
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="regRegion">
                    <Form.Label>Región:</Form.Label>
                    <FloatingLabel controlId="floatingRegRegion" label="Región" className="text-dark">
                        <Form.Select aria-label="Regiones de Chile"
                                     value={regForm.region}
                                     onChange={e => handleChangeRegion(e.target.value)}>
                            {
                                regiones.map( region => (
                                    <option key={region.region} value={region.region} >{region.region}</option>
                                ))
                            }
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="pb-5" controlId="regComuna">
                    <Form.Label>Comuna:</Form.Label>
                    <FloatingLabel controlId="floatingRegComuna" label="Comuna" className="text-dark">
                        <Form.Select aria-label="Comunas por región"
                                     value={regForm.comuna}
                                     onChange={e => setRegForm({...regForm, comuna: e.target.value})}>
                            {
                                comunas.map( comuna => (
                                    <option key={comuna} value={comuna}>{comuna}</option>
                                ))
                            }
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <div className="my-5">
                    <Form.Group className="mb-3" controlId="regPsw">
                        <Form.Label>Contraseña:</Form.Label>
                        <FloatingLabel label="Contraseña" controlId="floatingRegPsw" className="text-dark mb-3">
                            <Form.Control type="password" placeholder="Contraseña"
                                          value={regForm.pass}
                                          onChange={e => setRegForm({...regForm, pass: e.target.value})} />
                            <Form.Text className="text-danger" hidden={passwordSet.passwordHidden}>
                                {passwordSet.passwordText}
                            </Form.Text>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regPswRepeat">
                        <Form.Label>Repita la contraseña:</Form.Label>
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
                        <Form.Label>Correo:</Form.Label>
                        <FloatingLabel label="Ej.: nombre@dominio.cl" controlId="floatingRegEmail" className="text-dark mb-3">
                            <Form.Control type="email" placeholder="Email"
                                          value={regForm.correo}
                                          onChange={e => setRegForm({...regForm, correo: e.target.value})}
                            />
                            <Form.Text className="text-danger" hidden={emailSet.emailHidden}>
                                {emailSet.emailText}
                            </Form.Text>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regEmailRepeat">
                        <Form.Label>Repita el correo:</Form.Label>
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
                <Button variant="warning" type="submit" className="w-100" disabled={submitDisabledStatus}>Registrarse</Button>
            </Form>
        </Col>
    )
}

export default SignUp