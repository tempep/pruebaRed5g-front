import { SubmitHandler, useForm } from "react-hook-form"
import { useAuthStore } from "../store/auth.store";
import '../scss/_login.scss';
import { Grupo32966, Elipse197, Elipse216, Grupo258, Grupo32967, Grupo36052, Grupo36075 } from '../assets/index';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { ModalRecoverPassword } from "../components/ModalRecoverPassword";

interface InputsLogin {
  user: string;
  password: string
}

export const LoginPage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InputsLogin>();
  const changeStateAuthentication = useAuthStore(state => state.changeStateAuthentication);

  const toggleModal = () => setShowModal(!showModal);

  const onSubmit: SubmitHandler<InputsLogin> = ({ user, password }) => {
    if (user === 'fernando' && password === 'fer') {
      changeStateAuthentication(true);
    } else {
      setShowMessage(true);
      setTimeout( () => {
        setShowMessage(false);
      }, 10000)
      reset();
    }
  }

  return (
    <main className="container-login">
      <div className="container-img">
        <img src={Grupo32966} className="bottom-left-corner" />
        <img src={Grupo32967} className="top-right-corner" />
        <img src={Elipse197} className="left-center-point" />
        <img src={Elipse216} className="right-center-point" />
        <img src={Grupo36052} className="left-center-tree" />
        <img src={Grupo36075} className="right-center-tree" />
      </div>
      <form className="form-login-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="card-header">
          <img src={Grupo258} alt="Logo Safipay" className="logo-safipay" />
          <h1>Sufipay</h1>
          <h2>Administrador comercial</h2>
        </div>
        { showMessage && <span className="error-message2">Usuario y/o contraseña incorrectos</span> }
        <div className="card-body" id="card-body">
          <div className="input-container">
            <input
              type="text"
              id="user"
              {...register('user', { required: true })}
              placeholder="Usuario"
            />
            <label htmlFor="user" className="floating-label">
              Usuario
            </label>
            {errors.user && <span className="error-message">
              El usuario es requerido
            </span>}
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              placeholder="Contraseña"
            />
            <label htmlFor="password" className="floating-label">
              Contraseña
            </label>
            {errors.password && <span className="error-message">
              La contraseña es requerida
            </span>}
          </div>
        </div>
        <div className="card-footer">
          <button className="btnEnter">INGRESAR</button>
          {/* //TODO: Hacer funcionar el boton de la modal */}
          <Link className="link-forget-pass" to='#' onClick={ () => toggleModal()}>
            No recuerdo mi contraseña
          </Link>
        </div>
      </form>
      {
        showModal && <ModalRecoverPassword toggleModal={toggleModal} />
      }
    </main>
  )
}
