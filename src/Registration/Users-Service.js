const xss = require('xss')
const bcrypt = require('bcryptjs')

const UsersService = {
    getAllUsers(db){
      return db
        .select('userid','full_name','store')
        .from('users')
        .where('admin','false')
    },
    postNewUser(db, newUser){
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then((user)=> {
                console.log(user[0])
                return user[0]
            })
            .then(user=> UsersService.getById(db,user.id))
    },
    getById(db, id){
        return db
            .from('users')
            .select('*')
            .where('id',id)
            .first()
    },
    validatePassword(password) {
        if (password.length < 8) {
          return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
          return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ')|| password.endsWith(' ')) {
           return 'Password must not start or end with empty spaces'
        }
    },
    hasUserWithUserid(db, userid) {
     return db('users')
       .where({ userid })
       .first()
       .then(user => !!user)
    },
    hashPassword(password){
        return bcrypt.hash(password,12)
    },
    serializeUser(user) {
        return {
          id: user.id,
          full_name: xss(user.full_name),
          userid: xss(user.userid)
        }
    }
}

module.exports = UsersService;