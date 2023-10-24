import React,{useState} from "react";

export function useForm(getInitModelObject){
    const [values, setValues] = useState(getInitModelObject())
    const [errors, setErrors] = useState({})

    const handleInputChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetFormControls = () =>{
        setValues(getInitModelObject())
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    }

}
