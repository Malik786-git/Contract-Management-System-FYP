/*
    Contact details....
    project_name
    duration
    budget
    status (completed or incompleted)
    started date
    end date

*/

import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: String,
        required: true,
        trim: true,
    },
    budget: {
        type: Number,
        required: true,
        trim: true,
    },
    started_date: {
        type: Date,
        required: true,
        trim: true,
    },
    end_date: {
        type: Date,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['completed', 'incomplete'], 
        required: true,
        trim: true,
        default: 'incomplete'
    },
});

const contractModel = mongoose.model('Contract', contractSchema);

export default contractModel;
