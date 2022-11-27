import { toast, ToastOptions } from "react-toastify";

const defaultOptions: Partial<ToastOptions> = { position: toast.POSITION.TOP_RIGHT, autoClose: 5000, theme: 'colored'}

const successMessage = (message: string, options?: ToastOptions) => {
    if (message) toast.success(message, { ...defaultOptions, ...options })
}

const errorMessage = (message: string, options?: ToastOptions) => {
    if (message) toast.error(message, { ...defaultOptions, ...options })
}

export { successMessage, errorMessage }