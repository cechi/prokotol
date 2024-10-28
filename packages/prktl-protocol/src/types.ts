/**
 * PROKOTOL specification
 * 
 * @version 1.0.0
 * @author cechi
 */

/**
 * User PRKTLID
 * @<user_id>:<domain>
 */
export type PRKTLID_S = string;

/**
 * Space PRKTLID
 * !<space_id>:<domain>
 */
export type PRKTLID_U = string;


/**
 * Message PRKTLID
 * $<message_id>
 */
export type PRKTLID_M = string;

/** Any type of PRKTLID */
export type PRKTLID = string;

/** PRKTLID type */
export type PRKTLIDType = 'S' | 'U' | 'M';

/* UTC unix timestamp in seconds */
export type Timestamp = number;

export type Tags = string[];

type Entity = {
	/* unique identifier of the entity within the PRKTL server */
	id: PRKTLID;
	/* created at */
	ca?: Timestamp;
	/** created by user */
	cb?: PRKTLID;
	/* deleted at */
	da?: Timestamp;
	/** deleted by user */
	db?: PRKTLID;
}

export type Server = {
	/* domain of the server */
	d: string;
	/* tags of the server */
	t?: Tags;
}

export type Space = Entity & {
	/* id of the parent space */
	sid?: PRKTLID_S;
	/* name of the space */
	n?: string;
	/* tags of the space */
	t?: Tags;
}

export type Message = Entity & {
	/* id of the parent space */
	sid?: PRKTLID_S;
	/* id of the parent message */
	mid: PRKTLID_M;
	/* content of the message */
	d?: string;
	/* tags OF the message */
	t?: Tags;
	/** type of the message */
	z?: string;
}

export type User = Entity & {
	/* name of the user */
	n: string;
	/* email of the user */
	e: string;
	/* password hash of the user */
	p: string;
}

export type Subscription = Entity & {
	/* id of the user */
	uid: PRKTLID;
	/* id of the space */
	sid: PRKTLID;
}

export type SortDiraction = 1 | -1;

export type SearchOptions = {
	sort?: [string, SortDiraction][],
	limit?: number,
	offset?: number,
	filter?: any
};

export interface PRKTRelay {

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
	deleteSpace(id: PRKTLID): Promise<Space>;

	/**
	 * Get a space
	 * @param id Id of the space to be fetched
	 */
	getSpace(id: PRKTLID): Promise<Space>;

	/**
	 * Get spaces by specified filter
	 */
	getSpaces(options: SearchOptions): Promise<Space[]>;

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
	deleteMessage(id: PRKTLID): Promise<void>;

	/**
	 * Get a message
	 * @param id Id of the message to be fetched
	 */
	getMessage(id: PRKTLID): Promise<Message>;

	/**
	 * Get messages by specified filter
	 */
	getMessages(options: SearchOptions): Promise<Message[]>;

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
	deleteUser(id: PRKTLID): Promise<void>;

	/**
	 * Get a user
	 * @param id Id of the user to be fetched
	 */
	getUser(id: PRKTLID): Promise<User>;

	/**
	 * Get users by specified filter
	 */
	getUsers(options: SearchOptions): Promise<User[]>;

}

export type PRKTLError = {
	/** error code */
	c: number;
	/** error message */
	m: string;
	/** error status */
	s?: number;
}