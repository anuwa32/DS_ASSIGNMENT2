import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true
    },
    {
          name: 'Anupriya Thennakoon',
          email: 'anuwa@example.com',
          password: bcrypt.hashSync('123456', 10),
          
    },
    {
          name: 'Dilanka Weerasekara',
          email: 'dila@example.com',
          password: bcrypt.hashSync('123456', 10),
         
    },
    {
        name: 'Ishan Hamangoda',
        email: 'ishan@example.com',
        password: bcrypt.hashSync('123456', 10),
       
  },

]

export default users