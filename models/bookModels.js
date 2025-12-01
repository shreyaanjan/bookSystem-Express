import mongoose from "mongoose"

const booksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    }
})

const Books = new mongoose.model("Books", booksSchema)
export default Books