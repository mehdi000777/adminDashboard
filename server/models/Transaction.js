import mongoose from 'mongoose';

const TransactionModel = new mongoose.Schema({
    userId: String,
    cost: String,
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number
    }
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', TransactionModel);

export default Transaction;