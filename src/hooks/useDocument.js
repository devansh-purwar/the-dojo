import { useEffect, useState } from "react";
import { projectFireStore } from "../firebase/config";

export const useDocument = (collection, id) => {
    const [error, setError] = useState(null)
    const [document, setDocument] = useState(null)


    useEffect(() => {
        const ref = projectFireStore.collection('projects').doc(id)

        const unsub = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError("No document found")
            }

        }, (err) => {
            setError('failed to get document')
        })


        return () => unsub()
    }, [collection, id])

    return { document, error }
}