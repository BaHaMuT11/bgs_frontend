import React, {useContext, useEffect} from "react"
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap"
import "./edit_user.scss"
import {UserContext} from "../../context/UserProvider.jsx"
import {calcularEdad} from "../../util/calcularEdad.js"
import Swal from "sweetalert2"
import axios from "axios"
import {URL_OBTENER_INFO_GEOGRAFICA, URL_REGISTRAR_USUARIO} from "../../services/auth.js"

const EditUser = () => {

    const { regiones, setRegiones, comunas, setComunas,
            regForm, setRegForm, geoToogler, setGeoToogler,
            mostrarEditUser, setMostrarEditUser} = useContext(UserContext)

    const handleChangeRegion = (valorSelect) => {
        setRegForm({...regForm, region: valorSelect})
        setGeoToogler(!geoToogler)
    }

    const handleChangeNacimiento = (valorFecha) => {
        setRegForm({...regForm, edad: calcularEdad(valorFecha).toString(), fechaNacimiento: valorFecha.toString()})
    }

    const handleModSubmit = (e) => {

        e.preventDefault()

        if (!regForm.nombre.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (regForm.nombre.length < 3 || regForm.nombre.length > 50) {
            Swal.fire(
                'Whooooops',
                "El nombre debe tener al menos 3 caracteres",
                'error'
            )
            return
        }

        if (!regForm.usuario.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (regForm.usuario.length < 4 || regForm.usuario.length > 7) {
            Swal.fire(
                'Whooooops',
                "El login debe tener un mínimo de 4 caracteres y un máximo de 7",
                'error'
            )
            return
        }

        if (!regForm.fechaNacimiento.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (regForm.edad < 18) {
            Swal.fire(
                'Whooooops',
                "Debes ser mayor de edad para registrarte",
                'error'
            )
            setRegForm({...regForm, correo: ""})
            setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
            return
        }

        if (!regForm.rut.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (!regForm.fono.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }
        if (!regForm.calle.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }
        if (!regForm.numero.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
            return
        }

        if (!regForm.pass.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
                'error'
            )
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

        if (regForm.pass.length < 7) {
            Swal.fire(
                'Whooooops',
                "La contraseña debe tene al menos 7 caracteres",
                'error'
            )
            setRegForm({...regForm, pass: ""})
            setPasswordSet(({...passwordSet, passwordDos: "", passwordText: ""}))
            return
        }

        if (!regForm.correo.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios",
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

        if (regForm.correo.length < 5) {
            Swal.fire(
                'Whooooops',
                "El correo debe tener un mínimo de 5 caracteres",
                'error'
            )
            setRegForm({...regForm, correo: ""})
            setEmailSet(({...emailSet, emailDos: "", emailText: ""}))
            return
        }

        const registrarUsuario = async () => {
            try {
                let request = {
                    usuario: regForm.usuario,
                    nombre: regForm.nombre,
                    pass: regForm.pass,
                    fechaNacimiento: regForm.fechaNacimiento,
                    edad: regForm.edad,
                    rut: regForm.rut,
                    fono: regForm.fono,
                    calle: regForm.calle,
                    numero: regForm.numero,
                    casa: regForm.casa,
                    region: regForm.region,
                    comuna: regForm.comuna,
                    correo: regForm.correo,
                    estado: regForm.estado
                }

                const {data} = await axios.post(URL_REGISTRAR_USUARIO, request)

                if (data.estado.codigo = "200") {
                    Swal.fire(
                        'Excelente',
                        'Registro completado',
                        'success'
                    )
                    setRegForm({ usuario: "",
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
                    setRegForm({...regForm, pass: ""})
                    setPasswordSet(({...passwordSet, passwordDos: "", passwordText: ""}))
                    Swal.fire(
                        'Algo no salió bien',
                        'Revise sus datos y realice la solicitud nuevamente',
                        'error'
                    )
                }
            }
            catch (error) {
                setRegForm({...regForm, pass: ""})
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
        <>
            <Modal
                show={mostrarEditUser}
                onHide={() => setMostrarEditUser(false)}
                aria-labelledby="modalEditUser"
                size = "lg"
                centered
                className="eu-style h-75"
                scrollable={true}
            >
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title id="modalEditUser">
                        Modificar mis datos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form onSubmit={e => handleModSubmit(e)}>
                        <Form.Group className="mb-3" controlId="regFoto">
                            <Form.Label>URL foto:</Form.Label>
                            <FloatingLabel label="Ej.: http://www.fotos.cl/perfil.jpg" controlId="floatingRegNombre" className="text-dark mb-3">
                                <Form.Control type="text" placeholder="URL foto"
                                              value={regForm.imagen}
                                              onChange={e => setRegForm({...regForm, imagen: e.target.value})} />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="regNombre">
                            <Form.Label>Nombre: <span className="text-danger">*</span></Form.Label>
                            <FloatingLabel label="Nombre completo" controlId="floatingRegNombre" className="text-dark mb-3">
                                <Form.Control type="text" placeholder="Nombre completo"
                                              value={regForm.nombre}
                                              onChange={e => setRegForm({...regForm, nombre: e.target.value})} />
                                <Form.Text className="text-warning">
                                    Su nombre debe tener al menos 3 caracteres.
                                </Form.Text>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="regNacimiento">
                            <Form.Label>Fecha de nacimiento: <span className="text-danger">*</span></Form.Label>
                            <FloatingLabel controlId="floatingRegNacimiento" label="Fecha de nacimiento" className="text-dark">
                                <Form.Control type="date" placeholder="11-11-1985"
                                              onChange={e => handleChangeNacimiento(e.target.value)}/>
                                <Form.Text className="text-warning">
                                    Su fecha de nacimiento actual es: {new Date(`${regForm.fechaNacimiento}`).toLocaleDateString()}
                                </Form.Text>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="regRUT">
                            <Form.Label>RUT: <span className="text-danger">*</span></Form.Label>
                            <FloatingLabel label="Ej.: 16587231-K" controlId="floatingRegRUT" className="text-dark mb-3">
                                <Form.Control type="text" placeholder="16587231-K"
                                              value={regForm.rut}
                                              onChange={e => setRegForm({...regForm, rut: e.target.value})}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="regFono">
                            <Form.Label>Fono: <span className="text-danger">*</span></Form.Label>
                            <FloatingLabel label="Ej.: +56 9 4178 8523" controlId="floatingRegFono" className="text-dark mb-3">
                                <Form.Control type="text" placeholder="+56 9 4178 8523"
                                              value={regForm.fono}
                                              onChange={e => setRegForm({...regForm, fono: e.target.value})}/>
                            </FloatingLabel>
                        </Form.Group>
                        <div className="calle-completa pt-5">
                            <Form.Group className="mb-3" controlId="regCalle">
                                <Form.Label>Calle: <span className="text-danger">*</span></Form.Label>
                                <FloatingLabel label="Calle" controlId="floatingRegCalle" className="text-dark mb-3">
                                    <Form.Control type="text" placeholder="Calle"
                                                  value={regForm.calle}
                                                  onChange={e => setRegForm({...regForm, calle: e.target.value})} />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="regNumero">
                                <Form.Label>Número: <span className="text-danger">*</span></Form.Label>
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
                            <Form.Label>Región: <span className="text-danger">*</span></Form.Label>
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
                            <Form.Label>Comuna: <span className="text-danger">*</span></Form.Label>
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
                        <Button variant="warning" type="submit" className="w-100">Modificar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditUser