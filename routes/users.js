const express = require("express")
const router = express.Router()

router.use(logger)

router.get("/", (req,res) => {
  console.log(req.query.name)
  res.send("Users List")
})

router.get("/new", (req, res) => {
  res.render("users/new", {firstName:"Test"})
})
const user = [{name:"kyle"},{name:"sally"}]
router.post("/",(req, res) => {
  const isValid =false
  if(isValid){
    user.push({firstName:req.body.firstName})
    res.redirect(`users/${user.length-1}`)
  }
  else{
    console.log("error")
    res.render("users/new", { firstName:req.body.firstName } )
  }
 
 
})

router.route("/:id")
  .get((req, res) => {
    console.log(req.users)
    res.send(`Get users with: ${req.params.id}`)
  })
  .put((req, res) => {
      res.send(`Update  users with: ${req.params.id}`)
    }
  )
  .delete(
    (req, res) => {
      res.send(`Delete users with: ${req.params.id}`) 
    }
  )

  router.param("id",(req,res,next,id) => {

    req.users = user[id]
    next()

  })

  
function logger(req, res, next){
  console.log(req.originalUrl)
  next()
}


module.exports = router

