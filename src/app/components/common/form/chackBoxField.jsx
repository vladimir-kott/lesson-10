import React from "react"
import PropTypes from "prop-types";

const ChackBoxField = ({name, value, onChange, children, error}) => {
    const handleChange = () => {
        onChange({name:name, value:!value})
    }

    const getInputClasses = () => {
        return "form-chack-input" + (error ? " is-invalid" : "");
    };

    return ( 
        <div className="form-chack mb-4">
            <input className={getInputClasses()} type="checkbox" value="" id={name} onChange={handleChange} checked={value}/>
            <label className="form-chack-label is-invalid" htmlFor={name}>
                {children}
            </label>
            {error&&
                <div className="invalid-feedback">
                    {error}
                </div>
            }
        </div>
    );
}
ChackBoxField.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
};
 
export default ChackBoxField;