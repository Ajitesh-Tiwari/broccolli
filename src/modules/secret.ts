import { characters } from '../utilities/constants';
import { base32 } from '../utilities/utils';

export class Secret {
	public createRandomSecret(): string {
		const randomV = this.generateRandomString(16);
		const encoded = base32.encode(randomV);
		const index = encoded.indexOf('=');
		return encoded.slice(0, index)
	}

	public generateRandomString(length: number): string {
		let result = ' ';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	}
}
