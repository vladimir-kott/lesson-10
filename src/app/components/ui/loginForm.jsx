import React, {useState, useEffect} from "react"
import TextField from '../common/form/textField'
import ChackBoxField from '../common/form/chackBoxField'
import * as yup from 'yup';

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateSchame = yup.object().shape({
        password:yup.string().required("Пароль обязателен для заполнения")
        .matches(/(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
        .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
        .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать хотя бы один спец символ")
        .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
        email:yup.string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно")
    })

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        //const errors = validator(data, validatorConfig);
        validateSchame
        .validate(data)
        .then(()=>setErrors({}))
        .catch(err=>setErrors({[err.path]:err.message}))
        //setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        
         <form onSubmit={handleSubmit}>
             <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <ChackBoxField
                value={data.stayOn}
                onChange={handleChange}
                name='stayOn'
            >
                Оставаться в системе
            </ChackBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
        )
    }

 
export default LoginForm 