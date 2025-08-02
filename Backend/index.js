const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://sudhanshumishra22122017:X3Y5rumaVmR5uBC9@cluster0.ncfdlox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Define schema and model
const ScreenfitSchema = new mongoose.Schema({
    content: String
});

const Screenfit = mongoose.model('Screenfit', ScreenfitSchema, 'screenfit'); // force name

app.post('/save', async (req, res) => {
    const { content } = req.body;
    console.log('Received content:', content);

    try {
        const deleteResult = await Screenfit.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

        const entry = new Screenfit({ content });
        await entry.save();

        console.log('New entry saved:', entry);
        res.status(201).json(entry);
    } catch (err) {
        console.error('Error in /save:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/all', async (req, res) => {
    const data = await Screenfit.find({});
    res.json({ count: data.length, data });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});