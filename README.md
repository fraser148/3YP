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

## References
<a href="https://stackoverflow.com/">[1]</a>
Stackoverflow

<a href="https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express#creating-a-websocket-server">[2]</a>
How to Set Up a Websocket Server with Node.js and Express.
Ryan Glover.
June 1st, 2021