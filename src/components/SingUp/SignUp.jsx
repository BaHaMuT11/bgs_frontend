import React, {useContext, useEffect} from "react"
import "./sign_up.scss"
import {Button, Col, FloatingLabel, Form} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx";
import axios from "axios";
import {URL_OBTENER_INFO_GEOGRAFICA} from "../../services/auth.js";
import {calcularEdad} from "../../util/calcularEdad.js";

const SignUp = () => {

    const {regiones, setRegiones, comunas, setComunas, regForm, setRegForm, geoToogler, setGeoToogler} = useContext(UserContext)

    const handleChangeRegion = (valorSelect) => {
        setRegForm({...regForm, region: valorSelect})
        setGeoToogler(!geoToogler)
    }

    const handleChangeNacimiento = (valorFecha) => {
        setRegForm({...regForm, edad: calcularEdad(valorFecha).toString(), fechaNacimiento: valorFecha.toString()})
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
            <Form className="text-white">
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
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regPswRepeat">
                        <Form.Label>Repita la contraseña:</Form.Label>
                        <FloatingLabel label="Repita la contraseña" controlId="floatingRegPswRepeat"
                                       className="text-dark mb-3">
                            <Form.Control type="password" placeholder="Repita la contraseña" />
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
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regEmailRepeat">
                        <Form.Label>Repita el correo:</Form.Label>
                        <FloatingLabel label="Ej.: nombre@dominio.cl" controlId="floatingRegEmailRepeat" className="text-dark mb-3">
                            <Form.Control type="email" placeholder="Repita el email" />
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <Button variant="warning" type="submit" className="w-100">Registrarse</Button>
            </Form>
        </Col>
    )
}

export default SignUp