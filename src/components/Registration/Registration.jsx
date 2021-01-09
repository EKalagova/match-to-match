import { useState, useEffect } from 'react';
import { REGISTRATION_BASE_URL, LOGIN_URL, EMAIL_URL, NEW_USER_URL, TIMEOUT } from '../../utils/consts';
import { REQUIREMENTS } from '../../utils/titles';
import { postData } from '../../utils/api';

import ModalWindow from '../ModalWindow/ModalWindow';

import { block } from 'bem-cn';
import './Registration.css';

const b = block('regist');

function handlerPostRequest(url, timeout, data, handler) {
  postData(`${REGISTRATION_BASE_URL}${url}`, timeout, data)
        .then(response => {
          console.log('request', response)
          handler(false)
      })
      .catch(err => {
          console.log('request err', err)
          handler(true)
      })
}

export default function Registration({ onClick }) {
  const [email, setEmail] = useState({ value: '', isValid: false })
  const [login, setLogin] = useState({ value: '', isValid: false })
  const [password, setPassword] = useState({ value: '', isValid: false })
  const [passwordRepeat, setPasswordRepeated] = useState({ value: '', isValid: false })
  
  const [isDuplicateEmailError, setIsDuplicateEmailError] = useState(false)
  const [isDuplicateLoginError, setIsDuplicateLoginError] = useState(false)

  const [lastCheckedEmail, setLastCheckedEmail] = useState('')
  const [lastCheckedLogin, setLastCheckedLogin] = useState('')
  const [isFormComplete, setFormComplete] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log('isFormComplete', isFormComplete)
    if (isFormComplete) {
      console.log('if')
      const data = {
        email: email.value.trim(),
        login: login.value.trim(),
        password: password.value,
      };
  
      handlerPostRequest(NEW_USER_URL, TIMEOUT, data, setIsError)
    }

  }, [isFormComplete])

  function handleLoginChange(e) {
    const newValue = e.target.value;
    setLogin({
      value: newValue,
      isValid: REQUIREMENTS.login.every(rule => rule.isValid(newValue)),
    })
    console.log(e.target.value)
  }

  function checkLoginDuplicates(e, url) {
    const login = e.target.value.trim().toLowerCase();
    if (login && login !== lastCheckedLogin) {
      setLastCheckedLogin(login)
      handlerPostRequest(url, TIMEOUT, { login }, setIsDuplicateLoginError)
    }
  }

  function checkEmailDuplicates(e, url) {
    const email = e.target.value.trim().toLowerCase();
    if (email !== lastCheckedEmail) {
      setLastCheckedEmail(email)
      handlerPostRequest(url, TIMEOUT, { email }, setIsDuplicateEmailError)
    }
  }

  function handleEmailChange(e) {
    const newValue = e.target.value;
    setEmail({
      value: newValue,
      isValid: REQUIREMENTS.email.every(rule => rule.isValid(newValue)),
    })
    console.log(e.target.value)
  }

  function handlePasswordChange(e) {
    const newValue = e.target.value;
    setPassword(
      {
        value: newValue,
        isValid: REQUIREMENTS.password.every(rule => rule.isValid(newValue)),
      }
    )
    console.log(e.target.value)
  }

  return (
    <ModalWindow onClick={onClick}>
      
        <div className={b()}>
          <form className={b('form')} id="registration" onSubmit={(e) => {e.preventDefault(); setFormComplete(true)}}>
            <h1 className={b('title')}>Регистрация</h1>

            <label htmlFor="username">
              <span className={b('subtitle')}>Логин</span>

              <input
                type="text"
                id="username"
                className={b('input', { valid: login.isValid && !isDuplicateLoginError })}
                value={login.value}
                onChange={handleLoginChange}
                onFocus={() => setIsDuplicateLoginError(false)}
                onBlur={e => checkLoginDuplicates(e, LOGIN_URL)}
                pattern="[a-zA-Zа-яА-Я0-9]{2,30}$"
                autoComplete="username"
                placeholder="Имя"
                required
              />

              <ul className={b('requirements')}>
                {REQUIREMENTS.login.map((element, index) => (
                  <li className={b('rule', { valid: element.isValid })} key={index}>{element.rule}</li>
                ))}
                {isDuplicateLoginError && (
                  <li className={b('rule')}>Пользователь с таким логином уже зарегистрирован</li>
                )}
              </ul>
            </label>

            <label htmlFor="email">
              <span className={b('subtitle')}>Почта</span>

              <input
                type="text"
                id="email"
                className={b('input', { valid: email.isValid && !isDuplicateEmailError })}
                value={email.value}
                onChange={handleEmailChange}
                onFocus={() => setIsDuplicateEmailError(false)}
                onBlur={e => checkEmailDuplicates(e, EMAIL_URL)}
                placeholder="example@gmail.com"
                minLength="3"
                autoComplete="email"
                required
              />
              
              <ul className={b('requirements')}>
                {REQUIREMENTS.email.map((element, index) => (
                  <li className={b('rule', { valid: email.isValid })} key={index}>{element.rule}</li>
                ))}
                {isDuplicateEmailError && (
                  <li>Пользователь с такой почтой уже существует</li>
                )}
              </ul>
            </label>

            <label htmlFor="password">
              <span className={b('subtitle')}>Пароль</span>

              <input
                type="password"
                id="password"
                className={b('input', { valid: password.isValid })}
                autoComplete="new-password"
                maxLength="30"
                minLength="8"
                value={password.value} //учесть пробелы
                onChange={handlePasswordChange}
                required
              />

              <ul className={b('requirements')}>
              {REQUIREMENTS.password.map((element, index) => (
                  <li className={b('rule', { valid: password.isValid })} key={index} >{element.rule}</li>
                ))}
              </ul>
            </label>

            <label htmlFor="password_repeat">
              <span className={b('subtitle')}>Повторите пароль</span>
              <input
              // isValidForm: (formName, value) => this[formName].every(rule => isValid(value)),
                type="password"
                id="password_repeat"
                className={b('input', { valid: passwordRepeat.value && passwordRepeat.value === password.value })}
                maxLength="100"
                minLength="8"
                pattern={password.value}
                autoComplete="new-password"
                required
              />

              <ul className={b('requirements')}>
                {REQUIREMENTS.passwordRepeat.map((element, index) => (
                  <li className={b('rule', { valid: passwordRepeat.value && passwordRepeat.value === password.value })} key={index}>{element.rule}</li>
                ))}
              </ul>
            </label>

            <br />

            <input type="submit" className={b('button', { valid: login.isValid && email.isValid && password.isValid && passwordRepeat.value })}/>

          </form>
        </div>

    </ModalWindow>
  )
}