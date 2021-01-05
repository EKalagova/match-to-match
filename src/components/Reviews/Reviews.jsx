import { useState, useEffect } from 'react';
import { REVIEWS } from '../../utils/titles';

import './Reviews.css';

export default function Reviews({ onClick }) {
	return (
		<section className="reviews">
          {REVIEWS.map((review, index) => (
              <div className="reviews__review" key={index}>
                <img
                  src={review.photo}
                  className="reviews__photo"
                  alt={`Фотография ${review.name}`}
                />
                <div className="reviews__opinion-wrapper">
                  <p className="reviews__name">{review.name}:</p>
                  <p className="reviews__opinion">”{review.opinion}”</p>
                </div>
              </div>
            )
          )}
        </section>
	)
}