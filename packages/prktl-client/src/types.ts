export type RequestParamsOrder = ([string, 'asc'|'desc'|undefined][])|string[];

export type RequestHeaders = Record<string, string>;

export type RequestParams = {
	fields?: string[],
	where?: string|Record<string, string>,
	order?: RequestParamsOrder,
	offset?: number,
	count?: number,
	[key: string]: unknown
}

export type ParsedComponentId = {
	type: string,
	id: string,
	ids: string[]
}