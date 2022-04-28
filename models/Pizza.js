const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema({

    pizzaname: {
        type: String,
        required: 'You need to provide a pizza name!',
        trim: true
    },

    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    toppings: [],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'

    }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters:true
        },
        id: false
    }
);
// create pizza model using pizzaSchema

const Pizza = model('Pizza', PizzaSchema);

PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
})

// export pizza model
module.exports = Pizza;