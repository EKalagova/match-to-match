import { useState, useEffect } from 'react';
import { block } from 'bem-cn';
import './ModalWindow.css';

const b = block('modal');

export default function ModalWindow({ onClick, children }) {
	return (
		<div className={b()} onClick={() => onClick(false)}>
			<div className={b('content')} onClick={ e => e.stopPropagation() }>
				{children}
			</div>
        </div>
	)
}