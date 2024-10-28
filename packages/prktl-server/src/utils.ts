import { SearchOptions } from "@prokotol/protocol/dist/types";
import { Filter, FindOptions } from "mongodb";
import { Request } from 'express';
import { PRKTLRequest } from "./types";

export function convertFindArgs<TSchema>(options: SearchOptions): [Filter<TSchema>, FindOptions?] {
	const filter: Filter<TSchema> = options.filter || {};
	const findOptions: FindOptions = {};
	if (options.limit) findOptions.limit = options.limit;
	if (options.offset) findOptions.skip = options.offset;
	if (options.sort) findOptions.sort = options.sort;
	return [filter, findOptions];
}

export function convertRequest(request: Request) : PRKTLRequest {
	const prktlRequest = request as PRKTLRequest;
	const searchOptions: SearchOptions = {};
	if (request.query.filter) searchOptions.filter = JSON.parse(request.query.filter as string);
	if (request.query.limit) searchOptions.limit = parseInt(request.query.limit as string);
	if (request.query.offset) searchOptions.offset = parseInt(request.query.offset as string);
	if (request.query.sort) searchOptions.sort = JSON.parse(request.query.sort as string);
	prktlRequest.searchOptions = searchOptions;
	return prktlRequest;
}