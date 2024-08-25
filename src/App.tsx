import { useEffect, useState } from 'react';
import './App.css';
import Layout from './layout';
import { useAuthenticateMutation } from './redux/feature/auth/authApi';

function App() {
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [authenticate] = useAuthenticateMutation()

  useEffect(() => {
    const loadAuth = () => {
      if (isMounted) {
        try {
          authenticate({
            username: "user",
            password: "mak12345"
          }).unwrap()

        } catch (error) {
          console.log("Authentication error", error)
        }
        setIsMounted(false);
      }
    }
    loadAuth()

    return () => {
      setIsMounted(false);
    };
  }, [authenticate, isMounted])

  return (
    <Layout />
  )
}

export default App
