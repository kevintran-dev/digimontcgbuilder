

import React, { useState } from "react";

const NameSearchForm = ({ searchFor }) => {
    const [formData, setFormData] = useState({ series: "Digimon Card Game", n: "", desc: "" });
    const [selectData, setSelectData] = useState({ color: "", type: "", attribute: "", stage: "" })
    const [firstDisabled, setDisabled] = useState(false)

    const handleChange = async (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, series: "Digimon Card Game", [name]: value, desc: value }));

    };

    const [colorSelect, setColorSelect] = useState("")
    const handleColorSelect = (evt) => {
        const { value } = evt.target;
        setColorSelect(value);
        setDisabled(true);
        setFormData(data => ({ ...data, color: value }));
        setSelectData(data => ({ ...data, color: value }));
    }

    const [typeSelect, setTypeSelect] = useState("")
    const handleTypeSelect = (evt) => {
        const { value } = evt.target;
        setTypeSelect(value);
        setDisabled(true);
        setFormData(data => ({ ...data, type: value }));
        setSelectData(data => ({ ...data, type: value }));
    }

    const [attributeSelect, setAttributeSelect] = useState("")
    const handleAttributeSelect = (evt) => {
        const { value } = evt.target;
        setAttributeSelect(value);
        setDisabled(true);
        setFormData(data => ({ ...data, attribute: value }));
        setSelectData(data => ({ ...data, attribute: value }));
    }

    const [stageSelect, setStageSelect] = useState("")
    const handleStageSelect = (evt) => {
        const { value } = evt.target;
        setStageSelect(value);
        setDisabled(true);
        setFormData(data => ({ ...data, stage: value }));
        setSelectData(data => ({ ...data, stage: value }));
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let res = await searchFor(formData)
        // setFormData(formData);
    }
    const clearSelects = () => {
        setFormData({ series: "Digimon Card Game", n: formData.n, desc: formData.desc })
        setSelectData({ color: "", type: "", attribute: "", stage: "" })
        setColorSelect("");
        setTypeSelect("");
        setAttributeSelect("");
        setStageSelect("");
        setDisabled(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="n"></label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="n"
                    placeholder="Enter Digimon name here.."
                    value={formData.n}
                    id="n"
                />
            </div>
            <div className="select-options">
                <label> Color
                    <select value={selectData.color} name="color" onChange={handleColorSelect}>
                        <option value="" disabled={firstDisabled}>-- select an option --</option>
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="colorless">Colorless</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </label>

            </div>
            <div className="select-options">
                <label> Type
                    <select value={selectData.type} name="card-type" onChange={handleTypeSelect}>
                        <option value="" disabled={firstDisabled}>-- select an option --</option>
                        <option value="digimon">Digimon</option>
                        <option value="option">Option</option>
                        <option value="tamer">Tamer</option>
                        <option value="digi-egg">Digi-Egg</option>
                    </select>
                </label>

            </div>
            <div className="select-options">
                <label> Atrribute
                    <select value={selectData.attribute} name="attribute" onChange={handleAttributeSelect}>
                        <option value="" disabled={firstDisabled}>-- select an option --</option>
                        <option value="data">Data</option>
                        <option value="free">Free</option>
                        <option value="vaccine">Vaccine</option>
                        <option value="variable">Variable</option>
                        <option value="virus">Virus</option>

                    </select>
                </label>

            </div>
            <div className="select-options">
                <label> Stage
                    <select value={selectData.stage} name="stage" onChange={handleStageSelect}>
                        <option value="" disabled={firstDisabled}>-- select an option --</option>
                        <option value="baby">Baby</option>
                        <option value="In-Training">In-Training</option>
                        <option value="rookie">Rookie</option>
                        <option value="champion">Champion</option>
                        <option value="ultimate">Ultimate</option>
                        <option value="mega">Mega</option>
                    </select>
                </label>

            </div>
            <button type="submit">Submit</button>
            <button onClick={clearSelects}>Clear Selections</button>

        </form>
    )

}

export default NameSearchForm
