# Multi-UAV Based Precision Viticulture System

### Team Members:
@fraser148, Zipei, Lewis and Ipek

## HRI (Human Robot Interface)
Running the server in development:
```
npm run dev
```
## Some Endpoints
- `GET` /api/drone/location/:id

Returns the location of the drone with the parameter `ID`

- `GET` /api/project/drones/:project

Returns a list of all of the drones associated with a project and all of the details about that drone.

- `GET` /api/project/:project

Returns all the details of a given project
