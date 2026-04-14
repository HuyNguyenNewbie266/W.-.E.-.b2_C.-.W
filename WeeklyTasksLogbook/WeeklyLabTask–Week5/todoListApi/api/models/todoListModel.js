const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
          type: String,
          enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    },
    made_by: {
        type: String,
        required: 'Kindly enter the name of the user who created the task', 
        default: 'Nguyen Tan Huy - GCS230465'
    }
});
    
module.exports = mongoose.model('Tasks', TaskSchema);