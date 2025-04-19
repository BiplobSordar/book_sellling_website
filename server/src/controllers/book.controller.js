import cloudinary from "../config/Cloudnary.config.js";
import { Book } from "../models/book.model.js";
import streamifier from 'streamifier'



export const postABook = async (req, res) => {

    try {


        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'books',
                    resource_type: 'image',
                },
                (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });




        const newBook = await Book({
            ...req.body,
            coverImage: result.secure_url
        });
        await newBook.save();
        res.status(200).send({ message: "Book posted successfully", book: newBook })
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({ message: "Failed to create book" })
    }
}

// get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)

    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" })
    }
}

export const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Book not Found!" })
        }
        res.status(200).send(book)

    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({ message: "Failed to fetch book" })
    }

}

// update book data
export const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).send({ message: "Book is not Found!" })
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({ message: "Failed to update a book" })
    }
}

export const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book is not Found!" })
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({ message: "Failed to delete a book" })
    }
};


export const searchBook = async (req, res) => {
    try {
        const { text } = req.params;

        if (!text) {
            return res.status(400).json({ message: 'Search query is required.' });
        }

        const books = await Book.find({
            title: { $regex: text, $options: 'i' } // 'i' for case-insensitive
        });

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found.' });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        console.log(error)
    }
}

