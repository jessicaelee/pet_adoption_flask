import React, { useState } from 'react';

function NewBoxForm({ addBox }) {
    const INITIAL_STATE = { height: 0, width: 0, backgroundColor: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    /** Send {name, quantity} to parent
     *    & clear form. */
    const handleSubmit = evt => {
        console.log("FORRMMDATA", formData)
        evt.preventDefault();
        addBox(formData);
        setFormData(INITIAL_STATE);
    };

    /** Update local state w/curr state of input elem */
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="width">Width:</label>
                <input id="width" name="width" value={formData.width} onChange={handleChange} />
                <label htmlFor="height">Height:</label>
                <input id="height" name="height" value={formData.height} onChange={handleChange} />
                <label htmlFor="backgroundColor">Background color:</label>
                <input id="backgroundColor" name="backgroundColor" value={formData.backgroundColor} onChange={handleChange} />
                <button>Add a new box!</button>
            </form>
        </div>
    )
}


export default NewBoxForm;