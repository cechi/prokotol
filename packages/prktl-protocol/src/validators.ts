import { PRKTLID, PRKTLIDType } from "./types";

export const REGEX_DOMAIN = /([a-zA-Z0-9_\-]+)(?:\.([a-zA-Z0-9_\-]+))?$/;
export const REGEX_ID = /([a-zA-Z0-9_\-]+)/;
export const REGEX_PRKTLID_U = new RegExp('^@' + REGEX_ID.source + ':' + REGEX_DOMAIN.source);
export const REGEX_PRKTLID_S = new RegExp('^!' + REGEX_ID.source + ':' + REGEX_DOMAIN.source);
export const REGEX_PRKTLID_M = new RegExp('^$([a-zA-Z0-9]+)');

export const isUserId = (id: string) => REGEX_ID.test(id);
export const isSpaceId = (id: string) => REGEX_ID.test(id);

export const isUser = (id: PRKTLID) => REGEX_PRKTLID_U.test(id);
export const isSpace = (id: PRKTLID) => REGEX_PRKTLID_S.test(id);
export const isMessage = (id: PRKTLID) => REGEX_PRKTLID_M.test(id);

export function validate(id: PRKTLID) : PRKTLIDType|false {
	if (id === '' || id == null) return false;
	switch (id[0]) {
		case '@': return isUser(id) ? 'U' : false;
		case '!': return isSpace(id) ? 'S' : false;
		case '$': return isMessage(id) ? 'M' : false;
		default : return false;
	}
}
