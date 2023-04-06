import { useEffect, useState } from 'react'
import { projectAuth, projectFireStore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { user, dispatch } = useAuthContext()

  const logout = async () => {
    console.log("jdis")
    setError(null)
    setIsPending(true)
    try {
      const { uid } = user
      // sign the user out
      await projectFireStore.collection('users').doc(uid).update({ online: false })
      await projectAuth.signOut()
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })
      console.log(user)
      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}