in a terminal
```	
	$ cd back
	$ touch .env
	$ nano .env
			PORT=5000 
			USER=[user]
			PASSWORD=[psswd]
			DATABASE="brocoli"
			HOST="localhost"
			DB_PORT=3306
	$ node app.js
```
in an other terminal

```	
	$ cd front
	$ yarn run serve
```
