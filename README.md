# Port Control #

## Introduction ##

Port Control is an interactive educational web based game. It takes place in the The Port of Antwerp and is given to young adults to play when they go on a bus tour of the port. The game is pre-loaded on tablets which are kept in the Havencentrum and given to students before they enter the bus or when they are on the bus. The game is only intended to be played when the students are on the tour. 

The aim of the game is simple: have the most coins at the end. Students will work individually and in teams to play games, own regions and gain products to unlock bonus games for more coins. Eventually the team with the most coins in their wallet will win. 

Students will play mini games in different regions and they will read information and facts about the port before playing the games. At the end of the game they will be put on the top 5 leaderboard. The team with the highest collective score will own that region.

The longer they own a region, the more products they will collect. Products are traded on the market place and then are used to unlock mini games to give students extra coins. 

For more information, visit the Port Control [website](http://portcentre.maltegrapentin.com/).


## Technologies ##

Multiple technologies have been used during the development of this game and are required for the game to work. Beneath you can see the core technologies that were used.

**Front-end:**

- AngularJS
- HTML
- CSS
- Sass

**Back-end:**

- NodeJS
- Windows Azure:
	- SQL database
	- Debian server

## Get started ##

*This tutorial will tell you how you can get the project running locally on a Windows computer.*

### Getting the project ###

Clone or download the project from Github to your computer by using the respective button:

![clone/download button](https://cdn.pbrd.co/images/fhApRf59A.png)

### Installing the dependencies ###

1. Install Node from [here](https://nodejs.org/en/).
2. Open the Node.js command prompt and go to the "[back](https://github.com/mathiassamyn/PortGame/tree/master/back)" folder. To do this, you can use the command `cd "pathToFolder"` like it was done in the following image:

	![cd command](https://cdn.pbrd.co/images/1wNjtrHvg.png)

3. When in the folder, use the following command: `npm install`. This command will install all the dependencies that we need for the server to work.

### Setting up the database ###

1. Acquire a SQL database. The database that was used during this project was hosted on [Microsoft Azure](https://azure.microsoft.com/), which gives you the opportunity to try its services for free. 
2. Use the queries from the "[DatabaseQueries.txt](https://github.com/mathiassamyn/PortGame/blob/master/back/DatabaseQueries.txt)" file to create the database.   
3. Add a JSON-file with the name "DBConfig" to the "[back](https://github.com/mathiassamyn/PortGame/tree/master/back)" folder and put your database configuration in the file as shown below.

`
{
	"userName": "usernameForDatabase", 
	"password": "passwordForDatabase", 
	"server": "databaseServer", 
	"options": {
		"database": "databaseName",
		"encrypt": "yes/no"
	}
}
`

4. Fill the Guides, Teams, Regions and Minigames tables with data. This can be done by using the following code:

	`INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);`

### Starting the server ###

1. Using the command prompt, execute the following command in the "[back](https://github.com/mathiassamyn/PortGame/tree/master/back)" folder: `node server.js`
2. This will start the server and you should see something like this:

	![server start output](https://cdn.pbrd.co/images/fsdbWzoXc.png)
3. Go to [http://localhost:3000/#!/](http://localhost:3000/#!/ "http://localhost:3000/#!/")

The website is now is up and running on your local device!
