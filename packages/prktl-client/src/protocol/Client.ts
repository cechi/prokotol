import qs from 'qs';
import { RequestHeaders, RequestParams } from "../types";
import { utils } from '@omegagrid/core';
import { PRKTLError } from '@prokotol/protocol/dist/types';

export type ServiceOptions = {
	baseUrl: string;
	throwExceptions?: boolean;
	params?: Record<string, string>;
}

type MethodInfo = {method: string, args: IArguments};

export class ServiceAuthException extends Error {}

export class ClientErrorEvent extends Event {
	constructor(
		public readonly error: PRKTLError,
		public readonly method: MethodInfo
	) {
		super('error');
	}
}

export class ClientException extends Error {
	constructor(
		public readonly error: PRKTLError,
		public readonly method: MethodInfo
	) {
		super(error.m);
	}
}

export function serializeRequestParams(params: RequestParams): string {
	const p: Record<string, unknown> = {};
	for (const k in params) {
		p[k] = utils.isObject(params[k]) || Array.isArray(params[k]) ? JSON.stringify(params[k]) : params[k];
	}
	return qs.stringify(p, {addQueryPrefix: false});
}

export class Client extends EventTarget {

	public options: ServiceOptions;

	constructor(options: ServiceOptions) {
		super();
		this.setOptions(options);
	}
	
	private setOptions(options: ServiceOptions) {
		this.options = Object.assign({}, options);
		if (!/^(https?|\/)/.test(this.options.baseUrl)) this.options.baseUrl = `https://${this.options.baseUrl}`;
	}

	createUrl(path: string = '', params?: RequestParams) {
		const qs = params ? '?' + serializeRequestParams(params) : '';
		path = path.replace(/^\//, '');
		return [this.options.baseUrl, path].filter(p => p != null && p !== '').join('/') + qs;
	}

	async invokeMethod(m: MethodInfo) {
		switch (m.method) {
			case 'get': return this.get.call(this, ...m.args);
		}
	}

	createHeaders(headers?: RequestHeaders) {
		const defaultHeaders: RequestHeaders = {};
		return Object.assign(defaultHeaders, headers);
	}

	getRaw(path: string, params?: RequestParams, headers?: RequestHeaders): Promise<Response> {
		return fetch(this.createUrl(path, params), {
			headers: this.createHeaders(headers),
			credentials: 'include',
		});
	}

	async handleError(response: Response, method: MethodInfo) {
		const contentType = response.headers.get('Content-Type');
		let error: PRKTLError;
		if (contentType == 'application/json') {
			error = await response.json() as PRKTLError;
			error.s = response.status;
		} else {
			error = {c: 0, s: response.status, m: 'Unknown error'}
		}
		this.dispatchEvent(new ClientErrorEvent(error, method));
		if (this.options.throwExceptions) throw new ClientException(error, method);
	}

	async handleResponse<TResult>(response: Response) : Promise<TResult> {
		if (!response.ok) {
			this.handleError(response, {method: 'get', args: arguments});
			return null;
		}

		if (/application\/json/.test(response.headers.get('Content-Type'))) {
			return await response.json() as TResult;
		} else {
			return await response.text() as TResult;
		}
	}

	async get<T = unknown>(path: string, params?: RequestParams, headers?: RequestHeaders): Promise<T> {
		const response = await this.getRaw(path, params, headers);
		return await this.handleResponse<T>(response);
	}

	postRaw(path: string, data: unknown, params?: RequestParams, headers?: RequestHeaders): Promise<Response> {
		const json = utils.isObject(data) || Array.isArray(data);
		return fetch(this.createUrl(path, params), {
			method: 'POST',
			credentials: 'include',
			body: json ? JSON.stringify(data) : (data as string),
			headers: this.createHeaders({
				...(headers ?? {}),
				'Content-Type':  `${json ? 'application/json' : 'text/plain'}; charset=UTF-8`,
			})
		});
	}
	
	async post<T = unknown>(path: string, data: unknown, params?: RequestParams, headers?: RequestHeaders): Promise<T> {
		const response = await this.postRaw(path, data, params, headers);
		return await this.handleResponse<T>(response);
	}

	deleteRaw(path: string, params?: RequestParams, headers?: RequestHeaders): Promise<Response> {
		return fetch(this.createUrl(path, params), {
			method: 'DELETE',
			headers: this.createHeaders(headers),
			credentials: 'include',
		});
	}

	async delete<T = unknown>(path: string, params?: RequestParams, headers?: RequestHeaders): Promise<T> {
		const response = await this.deleteRaw(path, params, headers);
		return await this.handleResponse<T>(response);
	}

	putRaw(path: string, data: unknown, params?: RequestParams, headers?: RequestHeaders): Promise<Response> {
		const json = utils.isObject(data) || Array.isArray(data);
		return fetch(this.createUrl(path, params), {
			method: 'PUT',
			credentials: 'include',
			body: json ? JSON.stringify(data) : (data as string),
			headers: this.createHeaders({
				...(headers ?? {}),
				'Content-Type':  `${json ? 'application/json' : 'text/plain'}; charset=UTF-8`,
			})
		});
	}

	async put<T = unknown>(path: string, data: unknown, params?: RequestParams, headers?: RequestHeaders) {
		const response = await this.putRaw(path, data, params, headers);
		return await this.handleResponse<T>(response);
	}

}
