import React, { useState } from 'react';
import '../Styles/Login.css';
import LookingAtMapImage from '../Images/looking-at-map.jpeg'
import UserService from '../Services/user';
import {  UserToLogin } from '../Interfaces/interfaces';
import toast, { Toaster } from 'react-hot-toast';

const notifyError = (message: string) => toast.error(message);
const notifySuccess = (message: string) => toast.success(message);

const Login = () => {
  const [userInputType, setUserInputType] = useState('login');
  const [userToLogin, setUserToLogin] = useState<UserToLogin>({
    username: '', password: '', first_name: '', last_name: ''
  });

  const changeUserInputType = () => {
    if (userInputType === 'login') {
      setUserInputType('signin')
    }
    else {
      setUserInputType('login')
    }
  }

  const handleChangeUserLogin = (event: any) => {
    setUserToLogin({
      ...userToLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userInputType === 'login') {   
      const { username, password } = userToLogin;
      UserService.login(username, password)
      .then((res) => {
        if (res.data.Error) {
          return notifyError(res.data.Error)
        }
        if (res.data.access) {
          localStorage.setItem('accessToken', res.data.access)
          localStorage.setItem('refreshToken', res.data.refresh)
          return notifySuccess('Successful! You are now logged in')
        }
        return notifyError('Unable to log in at the moment, please try again later')
      })
      .catch(() => {
        return notifyError('Unable to log in at the moment, please try again later')
      })
    }
    else {
      const { first_name, last_name, username, password } = userToLogin;
      UserService.register(first_name, last_name, username, password)
        .then((res) => {
          if (res.data.Error) {
            return notifyError(res.data.Error)
          }
          if (res.data.Success) {
            setUserInputType('login')
            return notifySuccess('Successful! You are now signed up! Please now log in')
          }
          return notifyError('Unable to sign up at the moment, please try again later')
        })
        .catch((err) => {
          return notifyError('Unable to sign up at the moment, please try again later')
        })
    }
  }
  return (
    <div className='login'>
      <Toaster 
        toastOptions={{
        className: '',
        style: {
          border: '1px solid #08D0FC',
          padding: '16px',
          color: 'black',
          },
        }}
      />
      <div className='login_container'>
        
          <div className='login_children'>

            <div className={userInputType + '_form_container'}>

            <h2 style={{textAlign: 'left', paddingLeft: '42px'}}>{userInputType === 'login' ? 'Login': 'Sign up'}</h2>
            <div style={{display: 'flex'}}>

            <p style={{textAlign: 'left', paddingLeft: '42px', opacity: 0.5, marginTop: '-16px'}}>{userInputType === 'login' ? 'Dont have an account?' : 'Already have an account?'}</p>

            <p className={userInputType+'_change_user_type'} onClick={changeUserInputType} style={{textAlign: 'left', paddingLeft: '5px' , marginTop: '-16px', textDecoration: 'underline'}}>{userInputType === 'login' ? ' Sign up now!' : ' Log in now!'}</p>
            </div>
            
            <form action="" className={userInputType+'_form'} onSubmit={handleSubmit}>
              <label htmlFor="email" className="login_label">Email</label>

              <input className={userInputType + '_input'} type="text" placeholder='you@example.com' onChange={handleChangeUserLogin} name="username"/>

              <label htmlFor="password" className="login_label">Password</label>
              <input className={userInputType + '_input'} type="password" placeholder='password' onChange={handleChangeUserLogin} name="password"/>

              {userInputType === 'signin' ? (
                <>
                  <label htmlFor="first_name" className="login_label">First Name</label>
                  <input className={userInputType + '_input'} type="text" placeholder='first name' onChange={handleChangeUserLogin} name="first_name"/>
                  <label htmlFor="last_name" className="login_label">Last Name</label>
                  <input className={userInputType + '_input'} type="text" placeholder='last name' onChange={handleChangeUserLogin} name="last_name"/>
              </>
              ) : null}

              <button style={{ color: 'white', fontSize: 'x-large'}} className={userInputType + '_button'}>{userInputType === 'login' ? 'Login' : 'Sign up'}</button>
              {userInputType === 'login' ? (

              <div style={{display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto'}}>
                <button className='third_party_login_button' style={{border: '2px solid #DB4437', backgroundColor: 'white', color: '#DB4437'}}>Google</button>
                <button className='third_party_login_button' style={{border: '2px solid #4267B2', backgroundColor: 'white', color: '#4267B2'}}>Facebook</button>

              </div>
              ) : null}
            </form>

            </div>
          </div>

        <div className='login_children'>
          <img src={LookingAtMapImage} alt="person reading map" width="90%" height="90%" className='login_image'/>
        </div>

      </div>
    </div>
  )
}

export default Login;
