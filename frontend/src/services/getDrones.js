export function getDrones(id) {
    return fetch('http://localhost:3001/api/project/drones/' + id)
        .then(data => data.json())
}

export function getAvailable() {
    return fetch('http://localhost:3001/api/available')
        .then(data => data.json())
}
