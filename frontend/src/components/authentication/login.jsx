import React, { useState } from "react";
import { authenticate_user } from "../../actions/actions";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AuthenticationNavigation from "./authentication_navigation";
import { GoogleIcon, Github01Icon, LockIcon, UserIcon } from "hugeicons-react";
import { Button } from "./buttons";
import { useDispatch } from "react-redux";

export const Requirement = () => {
  return <div className="bg-white p-5 m-5 shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded">
    <h1 className="font-semibold text-center mb-2">Requirements for a password </h1>
    <ol className="list-disc list-inside">
      <li>Is at least 8 characters long.</li>
      <li>Contains at least one lowercase letter.</li>
      <li>Contains at least one uppercase letter.</li>
      <li>Contains at least one digit.</li>
      <li>Contains at least one special character.</li>
  </ol>
  </div>
}

export const validatePassword = (password)=>{
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password)
}

export const validateEmail = () =>{
  return true
}

const Login = () =>{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showRequirement, setShowRequirement] = useState(false)


  return(
    <div className="h-lvh bg-gradient-to-b from-[#bfdbfe] to-white">
      <AuthenticationNavigation right_text={{button_name : "Sign up", before_button : "Don't have an account?", navigation : "/register"}} />
      <div className="justify-items-center">
        <h1 className="text-xl p-5 font-light">Log in to your account</h1>
        {/* <Button Icon = {GoogleIcon} button_name = {"Login with google"} color  = {"white"}/> */}
        <div className="flex">
          <UserIcon size = {50} className="bg-white p-2 mr-[-5px] rounded" />
          <input className="p-3 w-80 rounded outline-none" placeholder = "Email" type="text" onChange={(event)=>{setEmail(event.target.value)}} />
        </div>
        <div className="flex p-5">
          <LockIcon size = {50} className="bg-white p-2 mr-[-5px] rounded" />
          <input name="password" type = "password" className="p-3 w-80 rounded outline-none" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} htmlFor="input"/>
        </div>
        <div className="mb-3">
            <Link className="text-sm text-blue-950">Don't remember your password?</Link>
        </div>
        <Button onClick = {()=>{
          if (validatePassword(password)) {
            const authenticate = authenticate_user({username : email, password: password})
            authenticate(dispatch)
          } else {
            setShowRequirement(true);
            setTimeout(() => {
              setShowRequirement(false);
            }, 5000);
          }
        }} Icon={undefined} className="bg-black w-36 rounded p-3 self-end text-white" button_name = {"Continue"}/>

        {showRequirement && <Requirement /> }
      </div>
    </div>
  )
}

export default Login