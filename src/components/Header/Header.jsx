import { useState, useEffect } from 'react';
import { getTitle } from '../../utils/helpers'
import Questionary from '../Questionary/Questionary';
import Registration from '../Registration/Registration';
import LoginForm from '../LoginForm/LoginForm';

import './Header.css';

export default function Header() {
	const [isQuestionary, setIsQuestionary] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [isRegistration, setIsRegistration] = useState(false);

	return (
		<>
		{/* <Questionary></Questionary> */}
			<header className="header">
				<div className="header__control-panel">
					<div
						className="header__button header__button_divider"
						onClick={() => setIsLogin(true)}
					>
						{getTitle('loginButtonName')}
					</div>
					<div
						className="header__button"
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