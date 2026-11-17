import SignupForm from "@/app/(public)/auth/signup/SignupForm";

export const metadata = {
    title: 'Sign up',
}

export default function Signup() {
    return (
        <div>
            <SignupForm />
        </div>
    )
}