import axios from 'axios'
import React, { useState } from 'react'
import style from './Signup.module.css'
export default function Signup({ getvalue }) {
  const [valuename_signup, setValuename_signup] = useState('')
  const [valuepassword_signup, setValuepassword_signup] = useState('')
  const [signupstates, setsignupstates] = useState(true)
  const [signupstateid, setsignupstateid] = useState('')
  const get_formname_signup_value = (e) => {
    setValuename_signup(e.target.value)
  }
  const get_formpassword_signup_value = (e) => {
    setValuepassword_signup(e.target.value)
  }
  const sumbit_signup_user_password = async () => {
    try {
      const responsedata = await axios.post('http://127.0.0.1:4000/signup', {
        data: {
          name: valuename_signup,
          password: valuepassword_signup
        }
      })
      console.log(responsedata);
      setsignupstates(responsedata.data.signupstate)
      if (signupstates) {
        setsignupstateid(responsedata.data.dataToSave._id)
      }
      setValuename_signup('')
      setValuepassword_signup('')
      console.log(signupstates);
    } catch (error) {
      console.log(error);
    }
  }
  getvalue(signupstateid);
  return (
    <div className={style.signup}>
      {/* 注册页面 */}
      <input type='text' value={valuename_signup} onChange={get_formname_signup_value}>
      </input>
      <input type='password' value={valuepassword_signup} onChange={get_formpassword_signup_value}>
      </input>
      {signupstates ? null : <div>账号重复</div>}
      <button onClick={sumbit_signup_user_password}>
        注册
      </button>
    </div>
  )
}
