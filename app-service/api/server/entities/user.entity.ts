import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert } from "typeorm";
import { Hash } from "../core/libs";
import { USER_CONFIG } from "../configs/constant";
@Entity('users')
export class UserEntity extends BaseEntity {

	@PrimaryGeneratedColumn()
	userId: number;

	@Column({
		length: 100
	})
	email: string;

	@Column({
		length: 100
	})
	firstName: string;

	@Column({
		length: 100
	})
	lastName: string;

	@Column({
		length: 100
	})
	phoneNumber: string;

	@Column({
		length: 225
	})
	password: string;

	@Column({
		default: USER_CONFIG.STATUS.ACTIVE
	})
	status: number;

	@BeforeInsert()
	hashPassword() {
		if (this.password) {
			this.password = Hash.encrypt(this.password);
		}
	}
}