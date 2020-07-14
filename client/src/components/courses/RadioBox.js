import React, { useState } from 'react'

const RadioBox = ({ prices, handleFilters }) => {

    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        console.log(value)
        setValue(event.target.value)
    }

    return prices.map((p, i) => (
        <div key={i}  >
            <input onChange={handleChange} value={`${p._id}`}
                className="form-check-input" type="radio" name={p} />
            <label className="form-check-label" >{p.name}</label>
        </div>
    ))
}

export default RadioBox