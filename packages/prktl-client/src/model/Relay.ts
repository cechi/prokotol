import { PRKTLID, PRKTRelay, Space, Message, User, SpaceFilter, MessageFilter, UserFilter } from "@prokotol/protocol/dist/types";
import { Client } from "./Client";


export class Relay extends Client implements PRKTRelay {

	async createSpace(space: Space): Promise<Space> {
		return this.post<Space>('space', space);
	}

	async updateSpace(space: Space): Promise<Space> {
		return this.put<Space>('space', space);
	}

	async deleteSpace(id: PRKTLID): Promise<void> {
		return this.delete('space', {id});
	}

	async getSpace(id: PRKTLID): Promise<Space> {
		return this.get<Space>('space', {id});
	}

	async getSpaces(filter: SpaceFilter): Promise<Space[]> {
		return this.get<Space[]>('spaces', filter);
	}

	async createMessage(message: Message): Promise<Message> {
		return this.post<Message>('message', message);
	}

	async updateMessage(message: Message): Promise<Message> {
		return this.post<Message>('message', message);
	}

	async deleteMessage(id: string): Promise<void> {
		return this.delete('message', {id});
	}

	async getMessage(id: PRKTLID): Promise<Message> {
		return this.get<Message>('message', {id});
	}

	async getMessages(filter: MessageFilter): Promise<Message[]> {
		return this.get<Message[]>('messages', filter);
	}

	async createUser(user: User): Promise<User> {
		return this.post<User>('user', user);
	}

	async updateUser(user: User): Promise<User> {
		return this.post<User>('user', user);
	}

	async deleteUser(id: string): Promise<void> {
		return this.delete('user', {id});
	}

	async getUser(id: PRKTLID): Promise<User> {
		return this.get<User>('user', {id});
	}

	async getUsers(filter: UserFilter): Promise<User[]> {
		return this.get<User[]>('users', filter);
	}

}
