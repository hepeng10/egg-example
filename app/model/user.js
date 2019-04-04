module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    // 定义 model。传入 表名，字段对象，options对象
    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(30),
        age: INTEGER,
    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        // timestamps: false,  // 关闭 created_at 和 updated_at 字段
    });

    // 添加方法，封装数据库操作
    User.findByName = async function (name) {
        return await this.findOne({
            where: {
                name
            }
        });
    };

    return User;
};