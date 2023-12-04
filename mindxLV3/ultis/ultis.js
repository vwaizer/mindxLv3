import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'admin';

export const connectToDB= async()=> {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('student');

  return 'done.';
}


export const addStudent = (stu, dataBase) => {
  console.log(path.resolve());
  let a = JSON.parse(dataBase);
  const enterStu = [...a, stu];
  fs.writeFileSync("students.json", JSON.stringify(enterStu));
};
export const   createToken =  (privateKey) =>  {
  console.log("create");
  return  new  Promise((resolve, reject) => {
     jwt.sign(
      { username: "admin", password: "1234" },
      privateKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err.message);
        }
        resolve(token);
      }
    );
  });
};
export const checkToken=(privateKey,token)=>{
  

  return new Promise((resolve,reject)=>{
    const decode=jwt.verify(token,privateKey,{maxAge:"1h"},(err,token)=>{
      if(err){
        reject(err.message)
      }
      resolve(token);
      
    });
    
  })
}

