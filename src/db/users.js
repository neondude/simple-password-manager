import md5 from 'md5'
import db from './config'


export const verifyLogin = (username, password) => {
  let result = db.get('users').find({'username':username,'password':md5(password)}).value()
  return result ? true : false
}

export const createUser = (username, password) => {
  const user_exists = db.get('users').find({username}).value()
  if(user_exists){
    return false
  }else{
    db.get('users').push({username,password:md5(password)}).write()
    return true
  }
}