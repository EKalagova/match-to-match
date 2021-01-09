import { block } from 'bem-cn';

import './ErrorWindow.css';
const b = block('error-window');

export default function ErrorWindow({ text, isError, isLoading }) {
    console.log(text, isError, isLoading)
    return (
        <div className={b()}>
            {isLoading && <div className={b('loader')}/>}
            {isError && text}
        </div>
    )
}