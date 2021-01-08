import { useState, useEffect, useRef } from 'react';
import { LOGIN_BASE_URL, TIMEOUT } from '../../utils/consts';
import { postData } from '../../utils/api';

import ModalWindow from '../ModalWindow/ModalWindow';

import { block } from 'bem-cn';
import './LoginForm.css';

const b = block('login');

export default function LoginForm({ onClick }) {
  const email = useRef(null)
  const password = useRef(null)
  //const [password, setPassword] = useState(null)
  const [isFormComplete, setFormComplete] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log(email.current, password)
    if (isFormComplete) {
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
            <label htmlFor="email">
              <span className={b('subtitle')}>Почта</span>
              <input
                type="text"
                id="email"
                ref={email}
                className={b('input')}
                onSubmit={() => console.log('onSubmit')}
                onCancel={() => console.log('onCancel')}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" //учесть пробелы
                minLength="2"
                defaultValue=""
                autoComplete="email"
                required
              />
            </label>

            <label htmlFor="password">
              <span className={b('subtitle')}>Пароль</span>

              <input
                type="password"
                id="password"
                ref={password}
                className={b('input')}
                autoComplete="new-password"
                defaultValue=""
                maxLength="30"
                minLength="8"
                required
              />
            </label>

            <br />

            <input type="submit" className={b('button')} onSubmit={() => console.log('onSubmit')}/>

          </form>
        </div>
    </ModalWindow>
  )
}