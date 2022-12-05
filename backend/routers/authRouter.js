const express = require('express')
const router = express.Router()
require('express-async-errors');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("../database/database")
const { APIError } = require("../error/apiError")
const { authUser, authPerms } = require("../middleware/auth")
const { StatusCodes } = require("http-status-codes")
const validator = require("validator")
const axios = require('axios');



// login
router.post("/login", async (req, res) => {

    const { email, passhass } = req.body

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email])


    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(passhass, user.rows[0].passhass)

    if (!(user && passwordCorrect)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        email: user.rows[0].email,
        id: user.rows[0].id,
        role: user.rows[0].role,
        username: user.rows[0].username,
        watchlist: user.rows[0].watchlist
    }

    const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.cookie("access_token", token, { httpOnly: true, maxAge: 60 * 60 * 60 * 60 }).status(StatusCodes.OK).json({ loggedIn: true, username: user.rows[0].username, role: user.rows[0].role })

})


//Logout

router.get("/logout", async (req, res) => {
    await res.clearCookie("access_token");
    res.status(StatusCodes.OK).json({ loggedIn: false })
})


//Delete user data from database

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    const deleteUserData = await pool.query("DELETE FROM users WHERE id=$1", [id])

    res.json({ status: "Worked" })
})


// Add new item to watchlist
router.post("/watchlist", authUser, async (req, res) => {

    const { coin } = req.body
    const user = req.user
    const id = user.id

    try {
        const addItem = await pool.query("UPDATE users SET watchlist = array_append(watchlist,$1) WHERE id=$2", [coin, id])
        console.log(req.body)
        res.status(200).json({ hey: "nonii" })
    } catch (err) {
        console.log(err)
    }

})

//Remove array values

router.delete("/watchlist/:coin", authUser, async (req, res) => {

    try {
        const { coin } = req.params
        const user = req.user
        const id = user.id

        const deleteValue = await pool.query("UPDATE users set watchlist = array_remove(watchlist,$1) WHERE id=$2", [coin, id])
        res.status(StatusCodes.OK).json({ status: "Worked!" })
    } catch (err) {
        console.log(err)
    }

})





//check all users
router.get("/", authUser, authPerms("admin"), async (req, res) => {

    const users = await pool.query("SELECT id,role,email,watchlist,username FROM users;")

    res.json({ data: users.rows })
})

//check if user is logged in
router.get("/isLoggedin", authUser, async (req, res) => {
    //get id from middleware
    const user = req.user
    const loggedinPerson = await pool.query("SELECT id,role,username,watchlist FROM users WHERE id=$1", [user.id])
    res.json({ loggedinPerson })
})


//update user

router.put("/:id", async (req, res) => {
    const { id } = req.params

    const update = await pool.query("UPDATE users SET username=$1 WHERE id=$2", [req.body.username, id])
    res.json({ status: "WORKED" })


})

//get user with id

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const wantedUser = await pool.query("SELECT * FROM users WHERE id=$1", [id])
    res.json({ data: wantedUser.rows })
})

//register

router.post("/register", async (req, res) => {

    const { username, email, passhass, role } = req.body

    if (!username || !email || !passhass) {
        throw new APIError("Pls write all fields!", StatusCodes.BAD_REQUEST)
    }

    //validate email

    if (!validator.isEmail(email)) {
        throw new APIError("Email not valid!", StatusCodes.BAD_REQUEST)
    }

    // check that username and email not taken
    const user = await pool.query("SELECT email from users WHERE email=$1;", [email]);
    const uniqueName = await pool.query("SELECT username from users WHERE username=$1;", [username]);


    if(user.rowCount > 0){
        
        res.status(StatusCodes.BAD_REQUEST).json({ loggedIn: false, status: "Email exist!" })
    }


    if(uniqueName.rowCount > 0){
        res.status(StatusCodes.BAD_REQUEST).json({loggedIn: false, status: "Username exist!"})
    }
    

    if (user.rowCount === 0 && uniqueName.rowCount === 0) {
        const salt = 10
        //success
        const hashedpass = await bcrypt.hash(passhass, salt)

        const newUser = await pool.query("INSERT INTO users(username,email,passhass,role) VALUES ($1,$2,$3,$4) RETURNING username;", [username, email, hashedpass, role])
        res.json({ username: username, role: role })
    } 


})





module.exports = router;