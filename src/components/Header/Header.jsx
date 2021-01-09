import { useState, useEffect } from 'react';
import { block } from 'bem-cn';

import { getTitle } from '../../utils/helpers'
import Questionary from '../Questionary/Questionary';
import Registration from '../Registration/Registration';
import LoginForm from '../LoginForm/LoginForm';

import './Header.css';
const b = block('header');

export default function Header() {
	const [isQuestionary, setIsQuestionary] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [isRegistration, setIsRegistration] = useState(false);

	return (
		<>
		{/* <Questionary></Questionary> */}
			<header className={b()}>
				<div className={b('control-panel')}>
					<div
						className={b('button', { divider: true })}
						onClick={() => setIsLogin(true)}
					>
						{getTitle('loginButtonName')}
					</div>
					<div
						className={b('button')}
						//onClick={onClick}
						onClick={() => setIsRegistration(true)}
					>
						{getTitle('registrationButtonName')}
					</div>
				</div>
			</header>
			{isRegistration && <Registration onClick={setIsRegistration}/>}
			{isQuestionary && <Questionary onClick={setIsQuestionary}/>}
            {isLogin && <LoginForm onClick={setIsLogin}/>}
		</>
	)
}