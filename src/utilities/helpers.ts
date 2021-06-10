export type GenericCallback<T> = (error: Error, result: T) => void;

export class MongoResponseBody {
	_id: string
	secret: string
}