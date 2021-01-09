import { useState, useEffect, useRef } from 'react';
import { LOGIN_BASE_URL, TIMEOUT } from '../../utils/consts';
import { getTitle } from '../../utils/helpers';
import { postData } from '../../utils/api';

import ModalWindow from '../ModalWindow/ModalWindow';
import ErrorWindow from '../ErrorWindow/ErrorWindow';

import { block } from 'bem-cn';
import './LoginForm.css';

const b = block('login');

export default function LoginForm({ onClick }) {
  const email = useRef(null)
  const password = useRef(null)
  
  const [visiblePassword, setVisiblePassword] = useState(false)

  const [isFormComplete, setFormComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    console.log(email.current, password)
    if (isFormComplete && !isLoading) {
      setIsLoading(true)
      const newEmail = email.current.value.trim().toLowerCase();
      const newPassword = password.current.value;

      postData(LOGIN_BASE_URL, TIMEOUT, { email: newEmail, password: newPassword })
        .then(response => {
          onClick();
      })
      .catch(err => {
          console.log('here')
          setIsError(true)
          setFormComplete(false)
      })
      .finally(() => setIsLoading(false))
      }

  }, [isFormComplete])

  return (
    <ModalWindow onClick={onClick}>
        <div className={b()}>
          <form
            className={b('form')}
            id="registration"
            onSubmit={(e) => {e.preventDefault(); setFormComplete(true);}}
          >
            <h1 className={b('title')}>Вход</h1>
            <label className={b('input-wrapper')} htmlFor="email">
              <span className={b('subtitle')}>Почта</span>
              <input
                type="text"
                id="email"
                ref={email}
                className={b('input', { margin: true })}
                pattern="^[ ]{0,}[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}[ ]{0,}$"
                minLength="2"
                defaultValue=""
                autoComplete="email"
                required
              />
            </label>

            <label className={b('input-wrapper')}  htmlFor="password">
              <span className={b('subtitle')}>Пароль</span>

              <input
                type={visiblePassword ? 'text' : 'password'}
                id="password"
                ref={password}
                className={b('input')}
                autoComplete="new-password"
                defaultValue=""
                maxLength="30"
                minLength="8"
                required
              />
              <div 
                className={b('icon', { visible: visiblePassword })}
                onClick={() => setVisiblePassword(!visiblePassword)}
                //alt={getTitle('visibility')}
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
                  <g><path d="M642.3,500.3c0,84.3-68.4,152.7-152.7,152.7c-84.3,0-152.7-68.4-152.7-152.7c0-84.3,68.4-152.7,152.7-152.7C574,347.6,642.3,416,642.3,500.3z"/><path d="M489.6,263.5c-130.8,0-236.8,106-236.8,236.8c0,130.8,106,236.8,236.8,236.8c130.8,0,236.8-106,236.8-236.8C726.4,369.5,620.4,263.5,489.6,263.5z M489.6,720.4c-121.5,0-220.1-98.5-220.1-220.1c0-121.5,98.5-220.1,220.1-220.1c121.5,0,220.1,98.5,220.1,220.1C709.7,621.8,611.1,720.4,489.6,720.4z"/><path d="M722.3,313.9c-68.2-61.7-124.4-98.7-218.5-98.7c-119.4,0-226.4,59.4-299.3,153.5C115.7,406.7,70.4,548.1,70.4,673.1c0,16,1.1,31.7,3.1,46.9C44.8,658.2,10,552.5,10,477.7C10,233.5,181.3,57.1,393.8,57.1C556,57.1,665.5,150.9,722.3,313.9z"/><path d="M565.7,777.5C658.8,749.7,715,695.4,756,610.7c52-107.4,28.3-209.7-24.6-316.2C736,198.1,647,93.1,521.2,39.4c-14.7-6.3-41.5-13.6-56-18.4c68.1,1.2,177.2,0,274.9,43.6C963,164.1,1045.2,443.8,952.5,635C881.8,781,737.2,797.6,565.7,777.5z"/><path d="M212.6,381.1c-20.3,89.6-16.1,189.9,30,271.9c58.5,104.1,178.8,130.6,296.5,148c101.2,52.6,252.3,9.9,361.3-51.3c13.9-7.8,39.9-27.7,52.2-36.8C912.7,768.1,816,870.8,750.9,907.5c-212.8,119.6-475.5,89-595-90.6C65.9,681.9,98.3,510.5,212.6,381.1z"/></g>
                </svg>
              </div>
              
            </label>
            <ErrorWindow text={getTitle('loginError')} isError={isError} isLoading={isLoading}/>
            <input type="submit" className={b('button')} onSubmit={() => console.log('onSubmit')}/>

          </form>
        </div>
    </ModalWindow>
  )
}