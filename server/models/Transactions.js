const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: [
            "Income","Expenses"
          ],
          required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: [
            "Food",
            "Transaportation",
            "Entertainment",
            "Shopping",
            "Utilities",
            "Health",
            "Travel",
            "Education",
            "Personal",
            "Groceries",
            "Bills",
            "Building",
            "Uncategorized"
          ],
          required: true,
    },
    color:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        required:true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
    notes:{
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }

);

const transaction = mongoose.model("transactions", transactionSchema);

module.exports = transaction;