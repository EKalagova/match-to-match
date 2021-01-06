export function fetchData(url, ms, data) {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('TIMEOUT'))
            abortController.abort();
        }, ms)

        fetch('http://localhost:8080' + url, {
                method: 'POST',
                signal: abortSignal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (resolve.status >= 400) {
                    throw new Error(response.status)
                }
                resolve(response.json());
            })
            .catch(err => reject(err))
            .finally(() => clearTimeout(timer))
    })
}

export function postData(url, ms, data) {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timed out'))
            abortController.abort();
        }, ms)

        console.log('postData')
        fetch('http://localhost:8080' + url, {
                method: 'POST',
                signal: abortSignal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (resolve.status >= 400) {
                    throw new Error(response.status)
                }
                resolve(response.json());
            })
            .catch(err => reject(err))
            .finally(() => clearTimeout(timer))
    })
}