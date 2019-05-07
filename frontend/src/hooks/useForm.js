import {useState} from "react"

/*
vychazi z: https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms/
 */

const useForm = (initState, callback) => {

    const [values, setValues] = useState(initState)

    const handleSubmit = event => {
        if (event) event.preventDefault()
        callback()
    }

    const handleChange = event => {
        event.persist()
        setValues(values => ({...values, [event.target.id]: event.target.value}))
    }

    return {
        handleChange,
        handleSubmit,
        values,
    }
}

export default useForm