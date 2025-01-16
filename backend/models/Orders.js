const mongoose =require('mongoose')
const {Schema}= mongoose;

const OrderSchema= new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    order_data:{
        type:Array,
        require:true
    },
    order_date:{
        type:Date,
        require:true
    },
})

module.exports = mongoose.model('Order', OrderSchema); 