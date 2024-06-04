import NewPassword from "@/components/auth/NewPassword";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { ConfirmToken } from "@/types";
import { useState } from "react"


export default function NewPasswordView() {

    const [token, setToken ] = useState<ConfirmToken['token']>("");
    const [isValid, setIsValid] = useState(false);

    return (
        <>
            {!isValid ? 
                <NewPassword 
                    token={token} 
                    setToken={setToken}
                    setIsValid={setIsValid}
                /> 
                    : 
                <NewPasswordForm 
                    token={token}
                />
            }
        </>
    )
}
