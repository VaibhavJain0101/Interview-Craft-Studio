import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (
            <main className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(116,76,255,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(30,182,138,0.14),transparent_24%),linear-gradient(180deg,#07111f_0%,#0c1726_52%,#101a2e_100%)] px-6 text-[#edf4ff]">
                <h1 className="font-['Fraunces',Georgia,serif] text-3xl">Loading.......</h1>
            </main>
        )
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(116,76,255,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(30,182,138,0.14),transparent_24%),linear-gradient(180deg,#07111f_0%,#0c1726_52%,#101a2e_100%)] px-6 py-10 text-[#edf4ff]">
            <div className="flex min-w-[min(350px,100%)] flex-col gap-4 rounded-3xl border border-white/10 bg-[rgba(9,18,32,0.78)] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <h1 className="font-['Fraunces',Georgia,serif] text-4xl text-[#f8fbff]">Register</h1>

                <form onSubmit={handleSubmit}>

                    <div className="flex flex-col gap-3">
                        <label className="font-semibold text-[#d7e3f3]" htmlFor="username">Username</label>
                        <input
                            className="rounded-xl border border-[rgba(96,165,250,0.2)] bg-[rgba(15,23,42,0.92)] px-4 py-3 text-[#eef5ff] outline-none placeholder:text-[#71829d] focus:border-[rgba(96,165,250,0.6)] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="mt-3 flex flex-col gap-3">
                        <label className="font-semibold text-[#d7e3f3]" htmlFor="email">Email</label>
                        <input
                            className="rounded-xl border border-[rgba(96,165,250,0.2)] bg-[rgba(15,23,42,0.92)] px-4 py-3 text-[#eef5ff] outline-none placeholder:text-[#71829d] focus:border-[rgba(96,165,250,0.6)] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="mt-3 flex flex-col gap-3">
                        <label className="font-semibold text-[#d7e3f3]" htmlFor="password">Password</label>
                        <input
                            className="rounded-xl border border-[rgba(96,165,250,0.2)] bg-[rgba(15,23,42,0.92)] px-4 py-3 text-[#eef5ff] outline-none placeholder:text-[#71829d] focus:border-[rgba(96,165,250,0.6)] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-2xl bg-linear-to-br from-[#2563eb] to-[#7c3aed] px-6 py-3 font-bold text-[#f8fbff] shadow-[0_18px_36px_rgba(37,99,235,0.28)] transition duration-300 active:scale-95">Register</button>

                </form>

                <p className="text-[#9fb0c8]">Already have an account? <Link className="text-[#7dd3fc]" to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register
