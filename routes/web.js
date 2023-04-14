import express from "express"
import candidateController from "../Controller/candidateController.js"
import verifyToken from "../Middleware/authMiddleware.js";



const router = express.Router()

//  Middleware for Authenticaton:
router.use('/candidatepage', verifyToken)


// Routes:
router.get("/", candidateController.landingPage)
router.get('/login', candidateController.userLogIn)
router.post('/login', candidateController.verifyUser)
router.get('/signup', candidateController.userSignUp)
router.post('/signup', candidateController.createUserDoc)
router.get('/logOut', candidateController.logOut)
router.get("/candidatePage", candidateController.getAllDoc)
router.post("/candidatePage", candidateController.createCandidateDoc)
router.get("/addInfo", candidateController.addInfo)
router.get("/edit/:id", candidateController.editDoc)
router.post("/update/:id", candidateController.updateDocById)
router.post("/delete/:id", candidateController.deleteDocById)

export default router