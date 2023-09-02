
import AlertContext from "./AlertContext";
import { toast } from 'react-toastify';

const AlertState = (props) => {
    const option = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    const showAlert = (type, message) => {
        if (type === "error") return toast.error(message, option);
        if (type === "success") return toast.success(message, option);
        if (type === "warn") return toast.warn(message, option);
        if (type === "info") return toast.info(message, option);
        toast(message, option);
    }
    
    const showPromiseAlert = async(promise) => {
        await toast.promise(
            promise,
            {
                pending: 'Loading server data.. ',
                success: 'Completed',
                error: 'Some Error Occur'
            },
            option
        )
        return
    }

    return (
        <AlertContext.Provider value={{ showAlert,showPromiseAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState