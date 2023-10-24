import BaseModel from "./BaseModel"
import CategoryModel from "./CategoryModel"


class ProductModel extends BaseModel {
  static tableName = "product"

  static relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "product.categoryId",
          to: "category.id",
        },
      },
    }
  }
}

export default ProductModel