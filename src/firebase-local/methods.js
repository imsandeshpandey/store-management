import { auth, db } from 'firebase-local';
import { doc, setDoc } from 'firebase/firestore';

const updateUser = async (data) => {
  const user = auth.currentUser;
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  try {
    setDoc(userRef, data, { merge: true });
  } catch (error) {
    console.error(error);
    alert('Error updating user!');
  }
};

const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  const res = await doc(db, 'users', user.uid);
  return res.data();
};

export { updateUser, getUserData };