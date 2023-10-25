import { auth } from "@/app/firebase/firebase";
import { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { authModalState } from "@/store/auth";



export default function ResetPassword() {

    const [email, setEmail] = useState('');
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
      auth
);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await sendPasswordResetEmail(
            email
          );
          if (success) {
            authModalState.getState().updateType('login');
            alert('Password reset link sent!');
          } 
    }

    useEffect(() => {
        if (error) {
          alert(error.message);
        }
    }, [error])



    return (
        <form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' 
        onSubmit={handleReset}
        
        >
        <h3 className='text-xl font-medium  text-black'>Reset Password</h3>
        <p className='text-sm text-black '>
            Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
            to reset it.
        </p>
        <div>
            <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                Your email
            </label>
            <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                placeholder='name@company.com'
            />
        </div>

        <button
            type='submit'
            className={`w-full text-black font-medium rounded-lg text-sm px-5 ring ring-gray-300 hover:ring-gray-500 py-2.5 text-center bg-gray-300 hover:bg-gray-400`}
        >
            {sending ? 'waiting... ' : 'Reset Password'}
        </button>
    </form>
    )
}