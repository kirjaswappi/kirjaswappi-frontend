import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import Loader from './components/shared/Loader'
import { useAuthenticateMutation, useGetUserByIdQuery } from './redux/feature/auth/authApi'
import { setUserInformation } from './redux/feature/auth/authSlice'
import { useAppSelector } from './redux/hooks'
import routes from './routes/route'
import { isTokenExpired } from './utility/getUser'
import { getToken } from './utility/localStorage'

export default function Authenticate() {
    const dispatch = useDispatch()
    const [authenticate, {isLoading}] = useAuthenticateMutation()
    const { userInformation } = useAppSelector((state)=> state.auth)
    const {data} = useGetUserByIdQuery(userInformation.id, {skip: !userInformation.id})
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
    
    useEffect(() => {
        if(data){
            dispatch(setUserInformation(data))
        }
        console.log(data)
    }, [data])
    
// console.log(data)
    // Global Loading Return
    if(isLoading) return <Loader/>

    // Routes return
    return (
        <React.Fragment>
            <RouterProvider router={routes} />
        </React.Fragment>
    )
}
