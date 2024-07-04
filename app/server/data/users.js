import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin ',
        email: "Admin@exemplo.com",
        password: bcrypt.hashSync('123', 10),
     },
     {
        name: 'User ',
        email: "user@exemplo.com",
        password: bcrypt.hashSync('123', 10),
     }, 
]; 

export default users; 

