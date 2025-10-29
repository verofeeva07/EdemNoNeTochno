const sequelize = require("./database");

const Product = sequelize.define("product",{
    id: { type: INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: STRING },
    data: { type: STRING },
    price: { type: INTEGER },
    
});

const ApparelSize = sequelize.define("apparel_size",{
    id: { type: INTEGER, primaryKey: true, autoIncrement: true},
    code: { type: INTEGER },
    order: { type: INTEGER },
});

Product.hasMany(ApparelSize);
ApparelSize.belongsTo(Product);

const ProductCategories = sequelize.define("product_categories",{
    id: { type: INTEGER, primaryKey: true, autoIncrement: true},
});

Product.hasMany(ProductCategories);
ProductCategories.belongsTo(Product);

const ProductColors = sequelize.define("product_colors",{
   id: { type: INTEGER, primaryKey: true, autoIncrement: true},
});

const Color = sequelize.define("color",{
    id: { type: INTEGER, primaryKey: true, autoIncrement: true},
    code: { type: INTEGER },
    name: {type: STRING},
 });

Product.hasMany(ProductColors);
ProductColors.belongsToMany(Product);
ProductColors.hasMany(Color);
Color.belongsTo(ProductColors);