import React from "react";
import PropTypes from "prop-types";
import Select from "react-select"

const MultiSelectField = ({options, onChange, name, label, defaultValue}) => {

    let optionArray = !Array.isArray(options) && typeof(options) === 'object'?
    Object.keys(options).map(optionName => 
        ({value:options[optionName]._id, label: options[optionName].name})):options

    const handleChange = (value) => {
        onChange({name:name, value})
    }

    return ( 
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <Select
                    isMulti
                    closeMenuOnSelect={false}
                    options={optionArray}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    onChange={handleChange} 
                    name={name}
                    defaultValue={defaultValue}
                />
        </div>
     );
}
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
 
export default MultiSelectField;