const express = require('express');
require('dotenv').config();

// const mongodb = {
// 	cnxStr: 'mongodb://localhost:27017/tienda-paris',
// 	options: {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		serverSelectionTimeoutMS: 5000
// 	}
// };

const mongodbU = {
	cnxStr: `mongodb+srv://${process.env.MONGO_ATLAS_USER}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_DATABASE}`,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	}
};


const firebase = {
	type: 'service_account',
	project_id: 'tienda-paris',
	private_key_id: 'dc606e9346e33e353b131147744904f21eeacc34',
	private_key:
		'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVa73Fnb7Et+8s\nmpqEoJG3fV/Pilsu5YZYL1gPaUu2PzNQtnOnt3YuCQaKwlRMkJLYC9XrkNFlY2Yg\nOKWchm4aC7VdymqQxgR50gyq4YWKPMosYP2HXHYJ9Lc+QrV7aWE8bmPzkrsJkRX6\nOGIliNC+XRjDFdtXBTSDAwvllXz2l7pgt/BtYpWq6cS2UgJRjvhL8Ehg3ShGXa2z\nYo2rEzdyEZUzNjIpewzaMRUd8gCyNDAjye8sSaYrcVKI1Plk5ZDLC0lJClhl+9W8\nmEtoshggESX08Ci013ZVMh/qsTp3qoQWAfYk2RCEr2nINiVkbsrsoA9UwTrXVwPf\nErkJhNzFAgMBAAECggEAEVreQ+G6kqa6hPfAEr+DrUhGpJhxVtUZ8YwuMjwMqzJU\nB3/plwVcGKS7ucoweGQiai2VvzKm35vX9M4fjjqe9y989VPZZM9bHbsj9YUUOaYt\n5VGuoNZAb4+Y6QZeheMLhDVeLqBQUSAk6Vc7LxjhBftSMPaM72KPYtgrvZLLXOi9\nMiEhJFvM2u+fT9DhXzbDa6pl1+WJPfbQ/79o5x/AKAktzAu6pTnvffQu8hFLzrbN\nCJqJ4SLr52irp6319KH1Wt48+aLJxNoJn8nRPdCJOgeGZ/Pi3UoC+rXyO2umsAqK\nGZI+mRkeK0AM387Xh9ehnnLjveXzOhwlVztX9QmG0QKBgQDEBjMsyH52/RmDTNdv\nNThrDsSzFOzdMzwKhBLxxFc6ygoXUnV1K31z8y8SCWd2kulQmiVb6nWQNy1biUWK\nJUoUvlH7avsCqIj9dmhUwOLRelfiDs4RckpH1RtvElF2kON6uK15kZYcW8obLFFz\nhgk4sOtugUS8s2YnDUfIMxnjuwKBgQDDI0kPVNE+32/cRL9G1Qkcj3Aj0Lwxqpqc\nGnIo7qY32rM3v+CqIGjKAex1Nz2HTABa6qY9k3U2BvHvuOFwgalohA+KI3uDOK3z\nyk8jdurivnNusf7ALuGnadxo9pQoq64T2o+Jgv5e9bOp0kAxk6EdzLSwZ4pyB/sa\n2y+6EsT5fwKBgGfQMMIC3Jb/q8dRpraKpPpts9Zzuo3bWGzpTW8k4F2OKpH3ZaVM\nBwClRcRznou5ej7po+dt4B0kW60ioeVrojQiJyDTo2PhBcvWLaLVFEqEVI6v8Ipk\n0NoCDqlgNixox1BzBcxgQfN62SpS6kAYOEIB0G2RoGmfSPZdnip0hb2JAoGBAIeQ\nRtxAx1EPdq2mkN+LdlYCDBzFkUhLxjc2ZCKtkInzBFhxk4l9FG9qILRZ2QPaN9Dx\nfOYAQAh1kLRCU1OOsHssa4NDHTZPNQHNhWcU4R7+wkCfpWQr7ZYZhAbjbpBGnJus\nVdVpTH/534PVzcTjU6XZJZn7hIGtq7O/nAt/qJnPAoGAMZ+wXyIDNxOIjSfiqE9L\nFrOydZwqTlQqJVZmf3dxiHDPYpsjV/zqy33kEmQ6oqAQLWtlAOlK7PnGGcDfE+3k\nj9VazEL8zWhekXfhkF2zihv/R2UZl5qZytiJ4V6D4vg6kp0SiJPeEddhA6oLXiQJ\nlXhJonwCvSJr/bnmpwnPCik=\n-----END PRIVATE KEY-----\n',
	client_email: 'firebase-adminsdk-5vhd0@tienda-paris.iam.gserviceaccount.com',
	client_id: '107940311773815428289',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5vhd0%40tienda-paris.iam.gserviceaccount.com'
};

module.exports = { firebase, mongodbU };
