import { useState, useEffect } from 'react';
import { QUESTIONNAIRE } from '../../utils/titles';
import { REGISTRATION_URL, TIMEOUT } from '../../utils/consts';
import { postData } from '../../utils/api';

import ModalWindow from '../ModalWindow/ModalWindow';

import { block } from 'bem-cn';
import './Registration.css';

const b = block('regist');

export default function Registration({ onClick }) {
  const [email, setEmail] = useState(null)
  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)
  const [isFormComplete, setFormComplete] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isFormComplete) {
      const data = { email, login, password };
      postData(REGISTRATION_URL, TIMEOUT, data)
        .then(response => {
          if (response.status !== 200) {
              throw(response.status);
          }
      })
      .catch(err => {
          console.log('here')
          setIsError(true)
      })
      }

  }, [isFormComplete])

  return (
    <ModalWindow onClick={onClick}>
        <div className={b()}>
          <form className={b('form')} id="registration">
            <h1 className={b('title')}>Регистрация</h1>

            <label htmlFor="username">
              <span>Логин</span>

              <input
                type="text"
                id="username"
                minLength="3"
                autoComplete="username"
                required
              />

              <ul className={b('requirements')}>
                <li>Не менее 2 знаков</li>
                <li>Содержит только буквы или цифры</li>
              </ul>
            </label>

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

              <ul className={b('requirements')}>
                <li>Длина должна быть более 8 знаков и менее 30</li>
                <li>Содержит как минимум 1 цифру</li>
                <li>Содержит как минимум 1 маленькую букву</li>
                <li>Содержит как минимум 1 большую букву</li>
                <li>Содержит специальный знак (e.g. @ !)</li>
              </ul>
            </label>

            <label htmlFor="password_repeat">
              <span>Repeat Password</span>
              <input
                type="password"
                id="password_repeat"
                maxLength="100"
                minLength="8"
                autoComplete="new-password"
                required
              />
            </label>

            <br />

            <input type="submit"/>

          </form>
        </div>
    </ModalWindow>
  )
}