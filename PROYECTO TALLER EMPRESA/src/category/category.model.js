import { Schema, model} from "mongoose"

const categorySchema = Schema({
    nameCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    versionKey: false
})

//esto pluralizar
export default model('category', categorySchema)