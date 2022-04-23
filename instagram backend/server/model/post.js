const mongoose =require('mongoose');

const Schema = mongoose.Schema;



let postSchema = new Schema({
    image:{
        type:String,
        required:true,
        
    },
    caption:{
        type:String,
    },
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:'User'

    }

},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
})

module.exports = mongoose.model('Post', postSchema);