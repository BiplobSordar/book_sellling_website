import express from 'express'
import { deleteABook, getAllBooks, getSingleBook, postABook, searchBook, UpdateBook } from '../controllers/book.controller.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';
import upload from '../middlewares/upload.js';
const router = express.Router()

// post a book
router.post("/create-book",verifyAdminToken,upload.single('coverImagee') ,postABook)

// get all books
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id",  verifyAdminToken,UpdateBook);

router.delete("/:id", verifyAdminToken, deleteABook)
router.get('/search/:text', searchBook)


export default router