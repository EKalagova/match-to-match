import { useState, useEffect } from 'react';
import { QUESTIONNAIRE_URL, TIMEOUT } from '../../utils/consts';
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
      postData(QUESTIONNAIRE_URL, TIMEOUT)
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
              <form class="registration" id="registration">
            <h1>Registration Form</h1>

            <label for="username">
              <span>Username</span>

              <input type="text" id="username" minlength="3" required />

              <ul class="input-requirements">
                <li>At least 3 characters long</li>
                <li>Must only contain letters and numbers (no special characters)</li>
              </ul>
            </label>

            <label for="password">
              <span>Password</span>

              <input type="password" id="password" maxlength="100" minlength="8" required />

              <ul class="input-requirements">
                <li>At least 8 characters long (and less than 100 characters)</li>
                <li>Contains at least 1 number</li>
                <li>Contains at least 1 lowercase letter</li>
                <li>Contains at least 1 uppercase letter</li>
                <li>Contains a special character (e.g. @ !)</li>
              </ul>
            </label>

            <label for="password_repeat">
              <span>Repeat Password</span>
              <input type="password" id="password_repeat" maxlength="100" minlength="8" required />
            </label>

            <br />

            <input type="submit"/>

          </form>
        </div>
    </ModalWindow>
  )
}