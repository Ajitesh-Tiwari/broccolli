import totp from 'totp-generator';

function generateTotp(secret: string) {
	return totp(secret, { digits: 8, period: 30 });
}

export = {
	generateTotp
};
