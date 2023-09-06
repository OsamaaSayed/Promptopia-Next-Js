import { toast } from "react-hot-toast"

const successOptions = {
    duration: 4000,
    style: {},
    className: '',
    // icon: '👏',

    // Change colors of success/error/loading icon
    iconTheme: {
        primary: '#00D26A',
        secondary: '#fff',
    },

    // Aria
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    }
}

const errorOptions = {
    duration: 4000,
    style: {},
    className: '',
    // icon: '👏',

    // Change colors of success/error/loading icon
    iconTheme: {
        primary: '#fff',
        secondary: '#F92F60',
    },

    // Aria
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    }
}

export const toastSuccess = (msg, options = successOptions) => {
    return toast.success(msg, options)
}


export const toastError = (msg = "Something went wrong, try again", options = errorOptions) => {
    console.log(msg);
    return toast.error(msg, options)
}

