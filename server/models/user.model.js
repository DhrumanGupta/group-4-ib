const { Schema, model } = require('mongoose')

const User = new Schema(
    {
        email: { type: Schema.Types.String, required: true, unique: true },
        password: { type: Schema.Types.String, required: true },
        role: {
            type: Schema.Types.String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
    },
    { collection: 'user-data' }
)

module.exports = model('UserData', User)
