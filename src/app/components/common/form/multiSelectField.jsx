import React from "react";
import PropTypes from "prop-types";
import Select from "react-select"

const MultiSelectField = ({options, onChange, name, label}) => {

    let optionArray = !Array.isArray(options) && typeof(options) === 'object'?
    Object.keys(options).map(optionName => 
        ({label: options[optionName].name, 
            value:options[optionName]._id})):options

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
                />
        </div>
     );
}
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
};
 
export default MultiSelectField;