import React,{createContext,useState} from 'react'; 

export const MenuContext = createContext(); 

const MenuContextProvider = ({children})=>{
    const [isOpen,setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const toggle_background = () => setIsDarkMode(!isDarkMode); 

    const toggleMenu = () => setIsOpen(!isOpen); 
    
    return (
        <MenuContext.Provider value={{isOpen,toggleMenu,isDarkMode,toggle_background}}>
            {children}
        </MenuContext.Provider>
    )
}
export default MenuContextProvider; 
