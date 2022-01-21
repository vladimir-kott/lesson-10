import React from "react";
import PropTypes from "prop-types";

const SelectedField = ({label, value, onChange, defoultOption, options, error, name}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? ' is-invalid':'')
    }

    let optionArray = !Array.isArray(options) && typeof(options) === 'object'?
    Object.keys(options).map(optionName => ({name: options[optionName].name, value:options[optionName]._id})):options

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    console.log('value', value)

    return (  
        <div className="mb-4">
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <select
                    className={getInputClasses()} 
                    id = {name} 
                    name={name} 
                    value={value} 
                    onChange={handleChange}
                    >
                    <option disabled value="">
                        {defoultOption}
                    </option>
                    {
                        optionArray && optionArray.map(option => 
                        <option 
                            value={option._id}
                            key = {option._id}
                            >
                            {option.name}
                        </option>)
                    }
                </select>
                {error&&<div className="invalid-feedback">
                    {error}
                </div>}
            </div>
    );
}

SelectedField.propTypes = {
    defoultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
};
 
export default SelectedField;