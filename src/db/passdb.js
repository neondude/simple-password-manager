import aes from 'aes256'
import db from './config'

export const getPassList = (username)=>{
  const result = db.get('passdb').filter({'username':username}).value()
  return result
}

export const checkExists = (website, username)=>{
  const result = db.get('passdb').find({website,username}).value()
  return result? true: false
}

export const addPass = (username, website, password, key)=>{
  const encrypted = aes.encrypt(key,password)
  db.get('passdb').push({username,website,password:encrypted}).write()
  // db.read()
  console.log('addPass: ')
  // console.log(result)
}

export const getPass = (website,username,key) => {
  console.log('getPass- key: ',key)
  const result = db.get('passdb').find({website,username}).value()
  console.log(result)
  const decrypted = aes.decrypt(key, result.password)
  return decrypted
}