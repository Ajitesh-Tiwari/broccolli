export type GenericCallback<T> = (error: Error, result: T) => void;

export class MongoResponseBody {
	_id: string
	secret: string
}

export class RequestBody {
	user: string;
}

export class LoginBody {
	user: string
	otp: number
}