const apiRequestQueue = [];
const enqueueApiRequest = (requestData) => {
    console.log(requestData);
    apiRequestQueue.push(requestData);
}

const dequeueApiRequest = () => {
    return apiRequestQueue.shift();
}

const proccessApiRequests = async () => {
    while (apiRequestQueue.length > 0) {
        const requestData = dequeueApiRequest()
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${requestData}`)
        return await response.json()
    }
}

function* generateRandomId() {
    yield Math.floor(Math.random() * 10)+1
}
document.querySelector('button').addEventListener('click', async () => {
    enqueueApiRequest(generateRandomId().next().value)
    const user = await proccessApiRequests()
    displayUser(user)
})

const displayUser = (user) => {
    const userInfo = document.getElementById('user-info')
    userInfo.innerHTML = `
        <span>${user.id}</span>
        <h1>${user.name}</h1>
        <p>${user.email}</p>
    `
}