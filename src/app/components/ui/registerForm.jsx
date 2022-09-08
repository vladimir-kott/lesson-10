import React, {useState, useEffect} from "react"
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectedField from '../common/form/selectField'
import api from '../../api'
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import ChackBoxField from "../common/form/chackBoxField"



const RegisterForm = () => {
    const [data, setData] = useState({ email: "",
    password: "",
    profession: "",
    sex: 'female',
    qualities:[],
    license:false
    });
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({})

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        console.log('api.qualities', api.qualities) 
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        },
        qualities: {
            isRequired: {
                message: 'Обязательно выберите ваши качества'
            }
        },
        license: {
            isRequired: {
                message: 'Подтвердите лицензионное соглашение'
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    console.log('data qualities ', data)

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
            <SelectedField
                label={'Выберите профессию'}
                onChange={handleChange}
                options={professions} 
                defoultOption={'Choose...'}
                error={errors.profession}
                value={data.profession}
                name="profession"
            />
            <RadioField
                options={[
                    {name: 'Male', value:'male'},
                    {name: 'Female', value: 'female'},
                    {name: 'Other', value:'other'}
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name='qualities'
                label="Выберите ваши качества"
                error={errors.qualities}
                defoultValue={data.qualities}
            />
            <ChackBoxField
                value={data.license}
                onChange={handleChange}
                name='license'
                error={errors.license}
            >
                Подтвердить <a>лецензионное соглашение</a>
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

export default RegisterForm;