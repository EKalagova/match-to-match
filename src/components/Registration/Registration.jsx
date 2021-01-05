import { useState, useEffect } from 'react';
import { QUESTIONNAIRE } from '../../utils/titles';
import { REGISTRATION_URL, TIMEOUT } from '../../utils/consts';
import { postData } from '../../utils/api';

import ModalWindow from '../ModalWindow/ModalWindow';

import { block } from 'bem-cn';
import './Registration.css';

const b = block('regist');

export default function Registration({ onClick }) {
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [lastCheckedEmail, setLastCheckedEmail] = useState('')
  const [isFormComplete, setFormComplete] = useState(false)
  const [isCheckedEmailError, setIsCheckedEmailError] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log('isFormComplete', isFormComplete)
    if (isFormComplete) {
      console.log('if')
      const data = {
        email: email.trim(),
        login: login.trim(),
        password: password.trim(),
      };
  
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

  function checkEmailDuplicates(e) {
    const email = e.target.value.trim().toLowerCase();
    if (email !== lastCheckedEmail) {

      setLastCheckedEmail(email)
      postData(REGISTRATION_URL, TIMEOUT, { email })
          .then(response => {
            console.log('response.status')
            if (response.status !== 200) {
              console.log('response.status')
                throw(response.status);
                
            }
        })
        .catch(err => {
            console.log('here')
            setIsCheckedEmailError(true)
        })
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
    console.log(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
    console.log(e.target.value)
  }

  return (
    <ModalWindow onClick={onClick}>
        <div className={b()}>
          <form className={b('form')} id="registration" onSubmit={(e) => {e.preventDefault(); setFormComplete(true)}}>
            <h1 className={b('title')}>Регистрация</h1>

            <label htmlFor="username">
              <span>Логин</span>

              <input
                type="text"
                id="username"
                value={login}
                onChange={e => setLogin(e.target.value)}
                pattern="[a-zA-Zа-яА-Я0-9]{2,30}$"
                autoComplete="username"
                placeholder="Имя"
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
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setIsCheckedEmailError(false)}
                onBlur={checkEmailDuplicates}
                placeholder="example@gmail.com"
                //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" //учесть пробелы
                minLength="3"
                autoComplete="email"
                required
              />
              
              <ul className={b('requirements')}>
                {isCheckedEmailError && (
                  <li>Пользователь с такой почтой уже существует</li>
                )}
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
                value={password} //учесть пробелы
                onChange={handlePasswordChange}
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
                pattern={password}
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