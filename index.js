import express from "express"
import connectDb from "./config/db.js"
import Books from "./models/bookModels.js"

const app = express()
const PORT = 9000

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

connectDb()

app.get('/', async (req, res) => {
    try {
        return res.render('index')
    } catch (error) {
        console.log(error);
    }
})

app.get('/display', async (req, res) => {
    try {
        const books = await Books.find({})
        return res.render("display", { books })
    } catch (error) {
        console.log(error);
    }
})

app.post('/add-book', async (req, res) => {
    try {
        const data = req.body
        const newBook = new Books(data)
        await newBook.save()
        return res.redirect('/display')
    } catch (error) {
        console.log(error);
    }
})

app.get('/delete-book/:deleteId', async (req, res) => {
    try {
        const { deleteId } = req.params
        await Books.findByIdAndDelete(deleteId)
        return res.redirect('/display')
    } catch (error) {
        console.log(error);
    }
})

app.get('/edit-book/:editId', async (req, res) => {
    try {
        const { editId } = req.params
        const editBook = await Books.findById(editId)
        return res.render('edit', { editBook })
    } catch (error) {
        console.log(error);
    }
})

app.post('/edit-book/:editId', async (req, res) => {
    try {
        const { editId } = req.params
        const data = req.body
        await Books.findByIdAndUpdate(editId, data)
        return res.redirect('/display')
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, (err) => {
    console.log(`Server is running at http://localhost:${PORT}`);
    if (err) console.log("Server is down.");
})