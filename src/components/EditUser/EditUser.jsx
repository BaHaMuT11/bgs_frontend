import React, {useContext, useEffect} from "react"
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap"
import "./edit_user.scss"
import {UserContext} from "../../context/UserProvider.jsx"
import {calcularEdad} from "../../util/calcularEdad.js"
import Swal from "sweetalert2"
import axios from "axios"
import {
    URL_BUSCAR_USUARIO_LOGIN,
    URL_MODIFICAR_USUARIO,
    URL_OBTENER_INFO_GEOGRAFICA,
    URL_REGISTRAR_USUARIO
} from "../../services/auth.js"
import {useNavigate} from "react-router-dom";

const EditUser = () => {

    const { regiones, setRegiones, comunas, setComunas,
            regForm, setRegForm, geoToogler, setGeoToogler,
            mostrarEditUser, setMostrarEditUser, ntk,
            setUsuarioActivo, setAutenticado} = useContext(UserContext)

    const navigate = useNavigate()

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


        if (!regForm.fechaNacimiento.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos obligatorios del formulario",
                'error'
            )
            return
        }

        if (regForm.edad < 18) {
            Swal.fire(
                'Whooooops',
                "Debes ser mayor de edad para hacer el registro",
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

        const modificarUsuario = async () => {
            try {
                let request = {
                    login: regForm.usuario,
                    imagen: !regForm.imagen.trim() ? "https://btl7.github.io/resources/img/interrogacion.png" : regForm.imagen,
                    nombre: regForm.nombre,
                    fechaNacimiento: regForm.fechaNacimiento,
                    rut: regForm.rut,
                    fono: regForm.fono,
                    calle: regForm.calle,
                    numero: regForm.numero,
                    casa: regForm.casa,
                    region: regForm.region,
                    comuna: regForm.comuna,
                    edad: regForm.edad
                }

                let configModUser = {
                    headers: {
                        "Content-Type": "Application/JSON",
                        "Authorization": "Bearer " + ntk
                    }
                }

                const {data} = await axios.put(URL_MODIFICAR_USUARIO, request, configModUser )

                if (data.estado.codigo = "200") {

                    const asignarUsuarioActivo = async() => {
                        try {
                            const configuracionUA = {
                                headers: {
                                    "Content-Type": "Application/JSON",
                                    "Authorization": "Bearer " + ntk
                                }
                            }
                            const {data} = await axios.get(URL_BUSCAR_USUARIO_LOGIN + request.login, configuracionUA)

                            setUsuarioActivo(data.usuario)
                            setAutenticado(true)

                            Swal.fire(
                                'Excelente',
                                'Se modificó correctamente',
                                'success'
                            )
                            setMostrarEditUser(false)
                            navigate("/profile/info")
                        }
                        catch(error){
                            Swal.fire(
                                'Buaaa x.x',
                                "Se modificó correctamente pero debes reiniciar sesión",
                                'error'
                            )
                        }
                    }
                    asignarUsuarioActivo()
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
                        estado: "ACTIVO",
                        imagen: ""
                    })
                } else {
                    setRegForm({...regForm, pass: ""})
                    Swal.fire(
                        'Algo no salió bien',
                        'Revise sus datos y realice la solicitud nuevamente',
                        'error'
                    )
                }
            }
            catch (error) {
                Swal.fire(
                    'Qué mal',
                    'No se pudo completar su solicitud',
                    'error'
                )
            }
        }
        modificarUsuario()
    }

    useEffect( ()=>{
        const asignarInfoGeografica = async () => {
            const {data} = await axios.get(URL_OBTENER_INFO_GEOGRAFICA)
            const regiones = data.regiones

            setRegiones(regiones)

            for (const region of regiones) {
                if (region.region === regForm.region) {
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