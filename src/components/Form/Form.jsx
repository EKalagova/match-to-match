import { useState, useEffect } from 'react';
import { block } from 'bem-cn';
import mainPicture from '../../images/main.jpg';

import { getTitle } from '../../utils/helpers'

import Reviews from '../Reviews/Reviews';
import Header from '../Header/Header';
import './Form.css';

const b = block('App');

function Form() {

  return (
    <>
      <div className={b()}>
        <Header/>
          <main className={b('header')}>
            <p className={b('title')}>{getTitle('title')}</p>
            <div className={b('image-wrapper')}>
              <img src={mainPicture} className={b('image')} alt="logo" />
              <p className={b('subtitle')}>{getTitle('subtitle')}</p>
            </div>
            <p className={b('description')}>{getTitle('description')}</p>
          </main>
          <Reviews />
      </div>
        
    </>
  );
}

export default Form;
