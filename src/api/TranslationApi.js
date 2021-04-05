import axios from 'axios';

export default {
	updateKeyValue({ transKey, transDomain, transLocale, transValue }) {
		const url = `/translation/api/configs/app/domains/${transDomain}/locales/${transLocale}/messages?id=${transKey}`;

		const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('message', transValue);

		return axios.post(url, formData);
	}
};
