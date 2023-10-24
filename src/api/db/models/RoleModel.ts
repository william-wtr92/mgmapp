import BaseModel from "./BaseModel"

class RoleModel extends BaseModel {
  static tableName = "role"
  right!: string
}

export default RoleModel
