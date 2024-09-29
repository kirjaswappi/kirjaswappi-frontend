import React, { useEffect, useRef } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAuthenticateMutation } from './redux/feature/auth/authApi'
import routes from './routes/route'
import { isTokenExpired } from './utility/getUser'
import { getToken } from './utility/localStorage'

export default function Authenticate() {
    const [authenticate, {isLoading}] = useAuthenticateMutation()
    const hasFetched = useRef(false)
    
    useEffect(() => {
        const auth = async () => {
            try {
                await authenticate({
                  username: "user",
                  password: "mak12345"
                }).unwrap();
              } catch (error) {
                console.log("Authentication error", error);
              }
    
        }
        if (!hasFetched.current) {
            const jwtToken = getToken('jwtToken')
            if(!jwtToken && isTokenExpired(jwtToken)){
                hasFetched.current = true;
                auth();
            }
        }
    }, [])

    // Global Loading Return
    if(isLoading) return <p>Loading...</p>

    // Routes return
    return (
        <React.Fragment>
            <RouterProvider router={routes} />
        </React.Fragment>
    )
}
