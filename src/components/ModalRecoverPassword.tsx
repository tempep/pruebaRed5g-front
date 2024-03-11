import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Input {
    email: string;
}

interface Props {
    toggleModal: () => void;
}

export const ModalRecoverPassword = ({ toggleModal }: Props) => {

    const { register, formState:{ errors, isValid }, handleSubmit } = useForm<Input>();


    const onSubmit: SubmitHandler<Input> = ({email}) => {
        toast.success('El correo de recuperación ha sido enviado. Por favor, revisa tu bandeja de entrada.', { duration: 5000, position: 'top-center' })
    }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[999]">
            {/* Modal Overlay */}
            <div className="fixed top-0 left-0 bottom-0 right-0 w-full bg-[rgba(49,49,49,0.8)] h-full"></div>
            {/* Modal content */}
            <div className="absolute w-1/4 top-[15%] left-[37.6%] animate-trans-top">
                <div className="p-12 shadow-md rounded-sm bg-white">

                    <form
                        className="flex flex-col justify-center gap-3 p-12 bg-indigo-100 w-full rounded-sm shadow-lg"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        
                        <h2 className="text-center text-2xl font-medium">Ingresa tu correo electronico para recuperar la contraseña</h2>

                        <div className="flex flex-col">
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                placeholder="Escribe tu correo..."
                                className="px-2.5 py-3 w-full text-sm text-gray-900 rounded-lg shadow-md focus:outline-none"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span className="text-red-600">El correo es requerido</span>}
                        </div>

                        <button
                            type="submit"
                            data-valid={isValid}
                            className="px-4 py-2 hover:scale-110 transition data-[valid]:!visible data-[valid]:trans self-center w-1/2 bg-red-500 rounded-sm text-white shadow-md mt-2 invisible"
                        >
                            Enviar
                        </button>
                    </form>
                </div>

                {/* Modal close button */}
                <button
                    type="button"
                    className="absolute bg-red-500 text-white px-2 shadow-md rounded-2xl top-1 right-[4px] text-3xl hover:scale-125 transition"
                    onClick={() => toggleModal()}
                >&times;</button>
            </div>
        </div>
  )
}
