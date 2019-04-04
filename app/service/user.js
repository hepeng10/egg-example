const Service = require('egg').Service;

class UserService extends Service {
    async addUser(name, age) {
        if (name) {
            try {
                const res = await this.app.mysql.insert('user', { name, age });
                if (res.affectedRows === 1) {  // 影响行数为1，则成功
                    return true;
                }
            } catch (e) {
                this.logger.error(err);
                return false;
            }
        } else {
            return false;
        }
    }
}

module.exports = UserService;