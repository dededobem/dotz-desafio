import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import api from '../services/api';

interface AuthState {
  user: FirebaseAuthTypes.User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthCustomer: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDataCurrentUser(): Promise<void> {
      const currentUser = await auth().currentUser;

      if (currentUser) {
        currentUser.getIdToken(true).then(function (idToken) {
          return { user: currentUser, token: idToken };
        });
      }

      setLoading(false);
    }
    loadDataCurrentUser();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        auth()
          .currentUser?.getIdToken(true)
          .then(function (idToken) {
            console.log(idToken);
            api.defaults.headers.Authorization = `Bearer ${idToken}`;
            setData({ user: response.user, token: idToken });
          });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }, []);

  const signUp = useCallback(async ({ email, password }) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Confirmação', 'Conta criada com sucesso!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Atenção', 'Este e-mail já está em uso!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Atenção', 'Endereço de E-mail inválido!');
        }

        console.error(error);
      });
  }, []);

  const signOut = useCallback(async () => {
    await auth().signOut();

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthCustomer, useAuth };
