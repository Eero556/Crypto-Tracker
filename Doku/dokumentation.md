

Project Coinbase "clone"

I Wanted to make some kind of react app that includes price tracking of stocks or cryptos.
Decided to make crypto price tracker because found better api for it and stock api would have cost me money.
Found simple and free api from coingeckos website and used it in my project.

Video: https://www.veed.io/view/3d1b237d-01e4-4ac5-b949-4e17d2f88c18?panel=share

Link to coingecko: https://www.coingecko.com/
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/project-coinbase1.PNG)

Main features that i want to include in my app are:
1. User managent system (Logging in/out and user roles) + JWT tokens
2. Tracking crypto prices and showing info about them
3. Watchlist which includes remove/adding cryptos


Used techologies:
- Front-end ReactJS and CSS
- Back-end Nodejs and Postgresql
- Tools git, Visual Studio Code


Important functions that can make this app work:

Front-end:

1. Add new coin to users watclist
- Add coin to list using axios. If coin already in watchlist then ignore
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/addcoin-project2.PNG)

2. Delete coin from users watchlist
- Delete coin from users watchlist and filtering list to show the process worked
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/deletecoin-project.PNG)

3. UseContex hook that allow to keep track on users logging state and watchlist.
- Usecontext hook to keep user status known in the app. No prop drilling!
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/usercontexproject.PNG)

4. ChartJS to show coin data
- Using chartjs library to show data as a chart
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/chartjsproject.PNG)

5. Admin page contains other people information
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/admin.PNG)

6. User page contains only his/hers information
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/user.PNG)


Back-end:

1. Register new user
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/backendRegisterproject.PNG)

2. Login user
- User login function that compares given password and password in database if match then continue
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/backendprojectlogin.PNG)

3. Add new coin to watchlist
- Adding new coin to users watchlist. Getting req.user from middleware!
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/backendAddproject.PNG)

4. Delete coin from watchlist
- Deleting coin from users watchlist. Getting req.user from middleware!
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/Deletebackendproject.PNG)

5. Isloggedin keep record if user is logged in
- Using this endpoint to determine if user is logged in. Middleware will give 403 forbidden if not valid user
![](Crypto/Doku/Images/userupdateproject.PNG)

6. Middleware that gives forbidden if no token or legit jwt token
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/middlewareproject.PNG)

7. Middleware that checks if your role is admin or user. User has access to own data and admin has access to all users data.
![](https://github.com/Eero556/Crypto-Tracker/blob/main/Doku/Images/middlewarerole.PNG)

What have i learned from this project?

- Planning takes a lot of time. Took around 2h to find proper api to get data for free and read the docs.
- Have never used useContext hook so that was very helpfull hook to stop prop drilling.
- PostreSQL is easy to use and free so that was a good thing i tried new database for my project
- To use useForm hook with yup resolver. Easy way to make sure you get wanted inputs in register fields
- Honestly learned to use React and react hooks better. Should learn some vue in the future or Angular
- Using new npm packages like momentum and chartjs


How many hours(h) this project took me?
- this project took me like 40-50hours? Its hard to say exact number because i thonk some solutions even on freedays :). This is fairly common with programmers. All in all i am very happy and will make more these kind of apps in the future. Spotify clone is one that interests me much, so that would be also new project to do.


What would i do better next time?

- If i had more time then make the ui better looking
- Use styled components so wouldnt use too much time on styling
- Research more about authentication/authorization so it would be more secure. 

Eero Kantonen Full-stack developer

















