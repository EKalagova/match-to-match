import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';

export default function useAuth() {
    const [isAuthorised, setIsAuthorise] = useState(null);

    return { isAuthorised };
}