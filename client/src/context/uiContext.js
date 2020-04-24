import React, { createContext, useState } from 'react';

export const UIContext = createContext();

const UIContextProvider = (props) => {
    const [tabValue, setTabValue] = useState(0);

    return (
        <UIContext.Provider value={{ tabValue, setTabValue }}>{props.children}</UIContext.Provider>
    );
};

export default UIContextProvider;
