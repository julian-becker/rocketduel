
// inspired by https://github.com/gwendall/expo-permissions-hooks/blob/master/src/index.js
import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';

const omitProps = ["getAsync", "askAsync", "PermissionStatus"]
export const availablePermissions = Object.keys(Permissions).filter(key => !omitProps.includes(key)).sort()

const usePermissions = (name) => {
    const [status, setStatus] = useState('checking');

    const get = async () => {
        const { status } = await Permissions.getAsync(Permissions[name]);
        setStatus(status);
    };

    const ask = async () => {
        const { status } = await Permissions.askAsync(Permissions[name]);
        setStatus(status);
    }
    useEffect(() => {
        get(); 
    }, []);

    return (
        {
            ask,
            status,
            isChecking: status === 'checking',
            isUndetermined: status === 'undetermined',
            isGranted: status === 'granted',
            isDenied: status === 'denied'
        }
    )
};

export default usePermissions;