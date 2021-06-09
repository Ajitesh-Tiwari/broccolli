import totp from 'totp-generator';

function generateTotp(secret: string) {
	return totp(secret, { digits: 8, algorithm: 'SHA-512', period: 30 });
}

export = {
	generateTotp
};
