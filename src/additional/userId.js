import { database } from '../firebase';

export default function getUserId(user) {
  const usersRef = database.collection('users');
  let userId;
  usersRef
    .where('uid', '==', user.uid)
    .get()
    .then((query) =>
      query.forEach((doc) => {
        userId = doc.id;
        console.log(userId);
      })
    );

  return userId;
}
