import React, {createContext, useState} from "react"

export const UserContext = createContext()

const UserProvider = (props) => {

    const [ntk, setNtk] = useState("")
    const [loginText, setLoginText] = useState("Login")

    return (
        <UserContext.Provider value={{
            ntk, setNtk,
            loginText, setLoginText
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider