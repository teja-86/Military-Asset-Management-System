// import bcrypt from 'bcryptjs';

// console.log(await bcrypt.hash('AdminPassword123!', 10));
import bcrypt from "bcryptjs";

const plain = 'basepass123';
const hash = '$2b$10$b13Q3lbo4yf5gl6tBVMrfu.Cp8lphsRhk9BHLmLaUJwuNA2NrGCH';

bcrypt.compare(plain, hash).then(console.log); // should print true
