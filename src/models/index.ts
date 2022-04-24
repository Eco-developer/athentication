import mongoose, { ConnectOptions } from 'mongoose';
import { User } from './userModel'; 
import 'dotenv/config';

const mongooseHeader = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as ConnectOptions;

const getUri = (uri: string | undefined) => {
	switch (true) {
		case `${uri}`.includes("production"):
			return process.env.MONGO_URI;
		case `${uri}`.includes("test"):
			return process.env.MONGO_URI_TEST;
		case `${uri}`.includes("development"):
			return process.env.MONGO_URI_DEVELOPMENT
		default:
			return process.env.MONGO_URI_DEVELOPMENT;
	}
}

const mongo_uri : string | undefined =  getUri(process.env.NODE_ENV);

export const connectDb = async () => {
	await mongoose.connect(`${mongo_uri}`, mongooseHeader)
    console.log(`${mongo_uri}`)
};

export const models = { 
	User,
};