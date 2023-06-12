import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { countries } from "../constants";

const DropdownCountries = (props) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const {tempFoundation, setTempFoundation} = props;


   

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {tempFoundation.country ? (
                    <span>
                        <b>{tempFoundation.country.name}</b> selected.
                    </span>
                ) : (
                    'No country selected.'
                )}
            </div>
        );
    };

	
    return (
        
            <Dropdown value={selectedCountry} onChange={(e) => {
				setSelectedCountry(e.value)
				let country = {country: e.value.code}
        		setTempFoundation( tempFoundation => ({...tempFoundation, ...country}))
				}} options={countries} optionLabel="name" placeholder="Select a Country" 
                valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-20rem" panelFooterTemplate={panelFooterTemplate} />
        
    )
}


export default DropdownCountries;