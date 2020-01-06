import { UserEntity } from "../entities/user.entity";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service } from "typedi";
@Service()
@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
}

