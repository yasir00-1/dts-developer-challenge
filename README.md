# dts-developer-challenge
my take on the dts challenge :)


To run the backend you'll need to:
1) Create a local postgreSQL database,  with a user that has permissions to select, insert, update and delete permissions for hibernate to automatically create the table (I really should've written this as I went along, it's already hard to remember)
2) set the enviroment variables: "DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT", "DB_USER_NAME" to their respective values to connect to the database (you create the user and it's credentials)
3) run ./gradlew build (and hopefully it passes the tests, you might need to ignore one test, I apologise)
4) run Application.Java (Don't forget the enviroment variables!)


To run the frontend it should be the same as the original:
1) `yarn install`
2) `yarn webpack`
3) `yarn start:dev`

## API endpoints

All the endpoints are routed to `http://localhost:400`

### List all cases
```
GET /cases
```
Expect a 200 response with JSON array of cases formatted like this:

```json
[
  {
    "id": "uuid-x",
    "caseNumber": "case-01",
    "title": "Example case",
    "description": "details..…",
    "status": "TODO",
    "dueDateTime": "2025-05-01T15:00:00Z"
  },
]
```

### Create a new case

```
POST /cases
Content-Type: application/json
```

Body must contain all fields except `description`

| Field         | Type                          | Required | Notes                                          |
|---------------|-------------------------------|:--------:|------------------------------------------------|
| caseNumber    | `string`                      |   Yes    | NOT assigned automatically|
| title         | `string`                      |   Yes    ||
| description   | `string`                      |    No    | OPTIONAL|
| status        | `string` (enum)               |   Yes    | Either one of `TODO`, `IN_PROGRESS`, `DONE` |
| dueDateTime   | `string` (ISO 8601 date-time) |   Yes    | Format `YYYY-MM-DDTHH:MM` (e.g. `2025-05-01T15:00`) |

Expect a 201 on success, 401 if a required field is missing and/or invalid


### Update a case's status

```
GET /cases/{id}/status?status={TODO|IN_PROGRESS|DONE}
```
Expect either a 200 for success, or a 404 error if no case with that id


### Deleting a case

```
DELETE /cases/{id}
```
