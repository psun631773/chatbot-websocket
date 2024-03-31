import React, { useState } from 'react'

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const logout = async () => {
        setLoading(true);
        try {

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
}

export default useLogout
