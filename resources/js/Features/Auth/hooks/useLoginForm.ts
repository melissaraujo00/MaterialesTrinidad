import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';


export const useLoginForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [loginAttempts, setLoginAttempts] = useState(0);
    const [showLockMessage, setShowLockMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (loginAttempts >= 5) {
            setShowLockMessage(true);
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
            onSuccess: () => setLoginAttempts(0),
            onError: () => setLoginAttempts((prev) => prev + 1),
        });
    };

    return {
        data,
        setData,
        submit,
        processing,
        errors,
        showPassword,
        setShowPassword,
        showLockMessage
    };
};
