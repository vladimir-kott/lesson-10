import React, {useState, useEffect} from "react"
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectedField from '../common/form/selectField'
import api from '../../api'
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import { useHistory } from "react-router-dom";

const UserEdit = () => {
    const history = useHistory();
    const userId = useHistory().location.pathname.split('/')[2]
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        if (target.name === 'profession'){
            console.log('profession')
            setData((prevState) => ({
                ...prevState,
                profession:{
                name: target.value,
                _id: userId}
            }));
        }
        else if (target.name === 'qualities'){
            /*let dataTarget = []
            target.value.forEach(element => {
                Object.values(qualities).filter((el) => {
                    if (el._id === element.value){
                        dataTarget.push(el)
                    }
                })
            });*/
            const qualityValue = Object.values(target.value).map((quality) => quality.value)
            const qualityObject = Object.values(qualities).filter((quality) =>
            qualityValue.includes(quality._id));
            setData((prevState) => ({ ...prevState, qualities: qualityObject }));
        }
        else{
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательное для заполнения"
            }, 
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        sex: {
            isRequired: {
                message: "Выберите ваш пол"
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
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
        console.log('data', data)
        api.users.update(userId, data)
        
        history.push(`/users/${userId}`);
    };
    console.log('user', data)
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {(data&&userId&&<form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                      <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                         <SelectedField
                            label={'Выберите профессию'}
                            onChange={handleChange}
                            options={professions} 
                            defaultOption={'Choose...'}
                            error={errors.profession}
                            value={data.profession.name}
                            name="profession"
                            selected={userId} 
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
                            defaultValue={data.qualities.map(el => {
                                return { value: el._id, label: el.name }
                            })}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>)}
                </div>
            </div>
        </div>
    )
}
 
export default UserEdit;