import React, { useState, useEffect, useContext } from "react";
import { InputSwitch } from "primereact/inputswitch";
import PrimeReact from 'primereact/api';
import { LayoutContext } from '../layout/context/layoutcontext';

const ThemeSwitch = () => {
    const [checked, setChecked] = useState(false);

    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    
    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    const changeTheme = (theme, colorScheme) => {
        
        PrimeReact.changeTheme(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState) => ({ ...prevState, theme, colorScheme }));
        });
    };

    const change = () => {
        if(!checked){
            changeTheme('lara-light-blue', 'light');
        }else{
            changeTheme('lara-dark-blue', 'dark');
        }
        
      };

    return (
        <div className="flex justify-content-center align-items-center ml-4">
            <InputSwitch 
                checked={checked} 
                onChange={(e) => {
                    setChecked(e.value)
                    change()
                    }} 
            />
        </div>
    );
}

export default ThemeSwitch;


