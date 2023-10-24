import BaseModel from "./BaseModel"
import RoleModel from "./RoleModel"
const { hashPassword } = require("../hashPassword.ts")

class UserModel extends BaseModel {
  static tableName = "user"

  id!: number
  passwordSalt!: string
  passwordHash!: string
  email!: string
  roleData!: RoleModel

  static relationMappings() {
    return {
      roleData: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: RoleModel,
        filter: (query: any) => query.select("right"),
        join: {
          from: "user.roleId",
          to: "role.id",
        },
      },
    }
  }

  checkPassword = async (password: string) => {
    const [passwordHash] = await hashPassword(password, this.passwordSalt)

    return passwordHash === this.passwordHash
  }
}

export default UserModel
