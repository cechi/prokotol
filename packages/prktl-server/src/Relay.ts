import * as prktl from "@prokotol/protocol/dist/types";
import { Db } from "mongodb";
import { convertFindArgs } from "./utils";

export class Relay implements prktl.PRKTRelay {
	
	constructor(private db: Db) { }

	async createSpace(space: prktl.Space): Promise<prktl.Space> {
		await this.db.collection<prktl.Space>('spaces').insertOne(space);
		return space;
	}

	async updateSpace(space: prktl.Space): Promise<prktl.Space> {
		throw new Error('Method not implemented.');
	}

	async deleteSpace(id: prktl.PRKTLID_S): Promise<prktl.Space> {
		throw new Error('Method not implemented.');
	}

	async getSpace(id: prktl.PRKTLID_S): Promise<prktl.Space> {
		throw new Error('Method not implemented.');
	}

	async getSpaces(options: prktl.SearchOptions): Promise<prktl.Space[]> {
		return await this.db.collection<prktl.Space>('spaces').find(...convertFindArgs(options)).toArray();
	}

	async createMessage(message: prktl.Message): Promise<prktl.Message> {
		throw new Error('Method not implemented.');
	}

	async updateMessage(message: prktl.Message): Promise<prktl.Message> {
		throw new Error('Method not implemented.');
	}

	async deleteMessage(id: prktl.PRKTLID_M): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async getMessage(id: prktl.PRKTLID_M): Promise<prktl.Message> {
		throw new Error('Method not implemented.');
	}

	async getMessages(options: prktl.SearchOptions): Promise<prktl.Message[]> {
		throw new Error('Method not implemented.');
	}

	async createUser(user: prktl.User): Promise<prktl.User> {
		throw new Error('Method not implemented.');
	}

	async updateUser(user: prktl.User): Promise<prktl.User> {
		throw new Error('Method not implemented.');
	}

	async deleteUser(id: prktl.PRKTLID_U): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async getUser(id: prktl.PRKTLID_U): Promise<prktl.User> {
		throw new Error('Method not implemented.');
	}

	async getUsers(options: prktl.SearchOptions): Promise<prktl.User[]> {
		throw new Error('Method not implemented.');
	}
}