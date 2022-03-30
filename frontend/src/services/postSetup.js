export function createProject() {
    return fetch('http://localhost:3001/api/setup')
        .then(data => data.json())
}
