import { useState, useEffect } from 'react';
import { QUESTIONNAIRE } from '../../utils/titles';
import { QUESTIONNAIRE_URL, TIMEOUT } from '../../utils/consts';
import { postData } from '../../utils/api';

import ModalWindow from '../ModalWindow/ModalWindow';

import { block } from 'bem-cn';
import './Questionary.css';

const b = block('questionnare');

export default function Questionary({ onClick }) {
  const [profile, setProfile] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isProfileComplete, setProfileComplete] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isProfileComplete) {
      postData(QUESTIONNAIRE_URL, TIMEOUT, profile)
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

  }, [isProfileComplete])

  const handleNextButton = answer => {
    const type =  QUESTIONNAIRE[currentQuestion].parameter;
    setProfile({ ...profile, [type]: answer });
    if (currentQuestion < QUESTIONNAIRE.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setProfileComplete(true)
    }
  }

  const handlePrevButton = () => {
    setCurrentQuestion(currentQuestion - 1);
  }

  return (
    <ModalWindow onClick={onClick}>
        <div className={b()}>
          <div
            className={b('button', {hidden: currentQuestion === 0})}
            onClick={handlePrevButton}
          />
          <div className={b('pagination')}>
            {QUESTIONNAIRE.map((question, index) => (
              <div className={b('dot', {active: currentQuestion < index})} key={index}></div>
            ))}
          </div>
          <p className={b('question')}>{QUESTIONNAIRE[currentQuestion].question}</p>
          <div className={b('answer-block')}>
            {QUESTIONNAIRE[currentQuestion].answers.map((answer, index) => (
              <button
                className={b('answer')}
                onClick={() => handleNextButton(answer)}
                key={index}
              >{answer}</button>
            ))}
          </div>
        </div>
    </ModalWindow>
  )
}