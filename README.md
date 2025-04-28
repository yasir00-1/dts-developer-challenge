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

