import mongoose from "mongoose";

const ProductStatModel = new mongoose.Schema({
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number
        }
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalUnits: Number
        }
    ]
}, { timestamps: true })

const ProductStat = mongoose.model('ProductStat', ProductStatModel);
export default ProductStat; 