import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (
            <main className="grid min-h-screen place-items-center bg-[#07111f] px-6 text-center text-[#edf4ff]">
                <h1 className="font-['Fraunces',Georgia,serif] text-4xl">Loading...</h1>
            </main>
        )
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected
