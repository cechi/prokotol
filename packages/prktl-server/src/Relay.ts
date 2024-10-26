import * as prktl from "@prokotol/protocol/dist/types";

export class Relay implements prktl.PRKTRelay {
	async createSpace(space: prktl.Space): Promise<prktl.Space> {
		throw new Error('Method not implemented.');
	}

	async updateSpace(space: prktl.Space): Promise<prktl.Space> {
		throw new Error('Method not implemented.');
	}

	async deleteSpace(id: prktl.PRKTLID_S): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async getSpace(id: prktl.PRKTLID_S): Promise<prktl.Space> {
		throw new Error('Method not implemented.');
	}

	async getSpaces(filter: prktl.SpaceFilter): Promise<prktl.Space[]> {
		throw new Error('Method not implemented.');
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

	async getMessages(filter: prktl.MessageFilter): Promise<prktl.Message[]> {
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

	async getUsers(filter: prktl.UserFilter): Promise<prktl.User[]> {
		throw new Error('Method not implemented.');
	}
}