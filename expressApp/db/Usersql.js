var sql = {
    insert: 'INSERT INTO test(userId,password,email) VALUES(?,?,?)',
    queryAll: 'SELECT * FROM test',
    getUserById: 'SELECT * FROM test WHERE userId = ? '
};
module.exports = sql;