import { SearchOptions } from '@prokotol/protocol/dist/types';
import { Request } from 'express';

export type PRKTLRequest = Request & {
	searchOptions: SearchOptions;
}