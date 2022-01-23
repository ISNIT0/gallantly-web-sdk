import wretch from 'wretch';
import { config } from './config';

export const api = wretch()
	.url(config.apiUrl);
