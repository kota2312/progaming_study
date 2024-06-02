import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {console.log(email, password);
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const value = {
        currentUser,
        signup
    };

    useEffect(() => {console.log(value);
        // Firebase Authのメソッド。ログイン状態が変化すると呼び出される
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        // コンポーネントのクリーンアップ時にサブスクリプションを解除
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
