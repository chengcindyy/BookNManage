import mongoose from 'mongoose';

const permissionSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});
export const Permission = mongoose.model('Permission', permissionSchema);