import mongoose from "mongoose";

const connectDb = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url).then(()=> console.log('Mongo DB Connected Successfully!'))
    .catch((error) => console.log(error))
}

export default connectDb