export function fetchData(url, ms, data) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('TIMEOUT'))
        }, ms)

        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                clearTimeout(timer)
                return response.json();
            })
            .then(response => resolve(response))
            .catch(err => {
                clearTimeout(timer)
                reject(err);
            })
    })
}

export function postData(url, ms, data) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('TIMEOUT')) //будет ли здесь ломаться?
        }, ms)
        console.log('postData')
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .finally(() => {
                console.log('clearTimeout');
                clearTimeout(timer)
            })
    })
}