type Entity = {
	/* guid as a unique identifier for the entity */
	id: string;
	/* date of creation */
	ca: Date;
	/** author of the message */
	cb: string;
}

export type Space = Entity & {
	/* id of the parent space */
	p: string;
	/* name of the space */
	n: string;
	/* tags for the space */
	t: string[];
}

export type Message = Entity & {
	/* content of the message */
	c: string;
	/* id of the parent space */
	s: string;
	/* tags for the message */
	t: string[];
	/** type of the message */
	z: string;
}

export type User = Entity & {
	/* name of the user */
	n: string;
	/* email of the user */
	e: string;
	/* password hash of the user */
	p: string;
}

export interface Relay {

	/**
	 * Create a new space
	 * @param space Space to be created
	 */
	createSpace(space: Space): Promise<Space>;

	/**
	 * Update a space
	 * @param space Space to be updated
	 */
	updateSpace(space: Space): Promise<Space>;

	/**
	 * Delete a space
	 * @param id Id of the space to be deleted
	 */
	deleteSpace(id: string): Promise<void>;

	/**
	 * Create a new message
	 * @param message Message to be created
	 */
	createMessage(message: Message): Promise<Message>;

	/**
	 * Update a message
	 * @param message Message to be updated
	 */
	updateMessage(message: Message): Promise<Message>;

	/**
	 * Delete a message
	 * @param id Id of the message to be deleted
	 */
	deleteMessage(id: string): Promise<void>;

	/**
	 * Create a new user
	 * @param user User to be created
	 */
	createUser(user: User): Promise<User>;

	/**
	 * Update a user
	 * @param user User to be updated
	 */
	updateUser(user: User): Promise<User>;

	/**
	 * Delete a user
	 * @param id Id of the user to be deleted
	 */
	deleteUser(id: string): Promise<void>;

}