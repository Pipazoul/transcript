/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Episodes = "episodes",
	Podcats = "podcats",
	Speakers = "speakers",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum EpisodesStateOptions {
	"pending" = "pending",
	"running" = "running",
	"error" = "error",
	"done" = "done",
}
export type EpisodesRecord<Ttranscript = unknown> = {
	audio?: string
	name?: string
	speakers?: RecordIdString[]
	state?: EpisodesStateOptions
	transcript?: null | Ttranscript
	url?: string
}

export type PodcatsRecord = {
	episodes?: RecordIdString[]
	image?: string
	name?: string
	url?: string
}

export type SpeakersRecord = {
	image?: string
	name?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type EpisodesResponse<Ttranscript = unknown, Texpand = unknown> = Required<EpisodesRecord<Ttranscript>> & BaseSystemFields<Texpand>
export type PodcatsResponse<Texpand = unknown> = Required<PodcatsRecord> & BaseSystemFields<Texpand>
export type SpeakersResponse<Texpand = unknown> = Required<SpeakersRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	episodes: EpisodesRecord
	podcats: PodcatsRecord
	speakers: SpeakersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	episodes: EpisodesResponse
	podcats: PodcatsResponse
	speakers: SpeakersResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'episodes'): RecordService<EpisodesResponse>
	collection(idOrName: 'podcats'): RecordService<PodcatsResponse>
	collection(idOrName: 'speakers'): RecordService<SpeakersResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
