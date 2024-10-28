import { PRKTLID, PRKTRelay, Space, Message, User, SearchOptions } from "@prokotol/protocol/dist/types";
import { Client } from "./Client";
import { prktl } from "../container";

export class RelayEvent extends Event { }

export class RelaySpaceEvent extends RelayEvent {
	constructor(type: string, readonly space?: Space) {
		super(`spaces.${type}`);
	}
}

export class RelayMessageEvent extends RelayEvent {
	constructor(type: string, readonly space?: Space) {
		super(`messages.${type}`);
	}
}

export class RelayUserEvent extends RelayEvent {
	constructor(type: string, readonly space?: Space) {
		super(`users.${type}`);
	}
}

export class Relay extends Client implements PRKTRelay {

	async createSpace(space: Partial<Space>): Promise<Space> {
		const newSpace = await this.post<Space>('space', space);
		prktl.events.dispatchEvent(new RelaySpaceEvent('change', newSpace));
		prktl.events.dispatchEvent(new RelaySpaceEvent('create', newSpace));
		return newSpace;
	}

	async updateSpace(space: Partial<Space>): Promise<Space> {
		const updatedSpace = await this.put<Space>('space', space);
		prktl.events.dispatchEvent(new RelaySpaceEvent('change', updatedSpace));
		prktl.events.dispatchEvent(new RelaySpaceEvent('update', updatedSpace));
		return updatedSpace;
	}

	async deleteSpace(id: PRKTLID): Promise<Space> {
		const deletedSpace = await this.delete<Space>('space', {id});
		prktl.events.dispatchEvent(new RelaySpaceEvent('change', deletedSpace));
		prktl.events.dispatchEvent(new RelaySpaceEvent('delete', deletedSpace));
		return deletedSpace;
	}

	getSpace(id: PRKTLID): Promise<Space> {
		return this.get<Space>('space', {id});
	}

	getSpaces(options: SearchOptions): Promise<Space[]> {
		return this.get<Space[]>('space', options);
	}

	createMessage(message: Partial<Message>): Promise<Message> {
		return this.post<Message>('message', message);
	}

	updateMessage(message: Partial<Message>): Promise<Message> {
		return this.post<Message>('message', message);
	}

	deleteMessage(id: string): Promise<void> {
		return this.delete('message', {id});
	}

	getMessage(id: PRKTLID): Promise<Message> {
		return this.get<Message>('message', {id});
	}

	getMessages(options: SearchOptions): Promise<Message[]> {
		return this.get<Message[]>('messages', options);
	}

	createUser(user: User): Promise<User> {
		return this.post<User>('user', user);
	}

	updateUser(user: User): Promise<User> {
		return this.post<User>('user', user);
	}

	deleteUser(id: string): Promise<void> {
		return this.delete('user', {id});
	}

	getUser(id: PRKTLID): Promise<User> {
		return this.get<User>('user', {id});
	}

	getUsers(options: SearchOptions): Promise<User[]> {
		return this.get<User[]>('users', options);
	}

}
