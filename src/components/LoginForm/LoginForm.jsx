import { useState, useEffect } from 'react';
import { LOGIN_URL, TIMEOUT } from '../../utils/consts';
import { postData } from '../../utils/api';

import ModalWindow from '../ModalWindow/ModalWindow';

import { block } from 'bem-cn';
import './LoginForm.css';

const b = block('login');

export default function LoginForm({ onClick }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [isFormComplete, setFormComplete] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isFormComplete) {
      postData(LOGIN_URL, TIMEOUT)
        .then(response => {
          if (response.status !== 200) {
              throw(response.status);
          }
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
          <form className={b('form')} id="registration">
            <h1 className={b('title')}>Вход</h1>

            <label htmlFor="email">
              <span>Почта</span>

              <input
                type="text"
                id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" //учесть пробелы
                minLength="3"
                autoComplete="email"
                required
              />

              <ul className={b('requirements')}>
                <li>Не менее 2 знаков</li>
                <li>Содержит только буквы или цифры</li>
              </ul>
            </label>

            <label htmlFor="password">
              <span>Пароль</span>

              <input
                type="password"
                id="password"
                autoComplete="new-password"
                maxLength="30"
                minLength="8"
                required
              />
            </label>

            <br />

            <input type="submit" onSubmit={() => console.log('onSubmit')}/>

          </form>
        </div>
    </ModalWindow>
  )
}