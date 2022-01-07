# todolist
A To-Do list app where you can basically add the things you need to get done. In this app you can create different lists for different things.

Implemented all of the things which I learned while learning about the backend technologies. I built this to-do list app using HTML, CSS, Bootstrap, JavaScript, Nodejs with express and EJS frameworks, and I used mongoDB as a database and implented the code using the mongoose framework (as it makes all the painful things that we need to write with native mongodb easier and much cleaner)

I'll host the website live on the mongoDB Atlas and Heroku and I'll make sure to provide the link for it here in the README file.

For now as the code is written the app will work on the localhost on your machine. You can fork the repo and use it as you like.

# How it works
- When you open the website you'll land on the homepage where you can add whatever task you want done.
- If you want to create different lists you'll have to do it by specifying the path in the url by adding a "/examplelist" at the end of the url and in place of "examplelist" you'll have the name of your list. For example if you want to create a to-do list for your work then you'll do that by adding "/work" at the end of the url.
- The data will be saved in the database and you can access the data again by specifying the path using which you added the data before. 
