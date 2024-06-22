import React, { useReducer, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

// createThemeを使用してテーマを作成
const theme = createTheme();

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 400,
    margin: `${theme.spacing(0)} auto`
  },
  signupBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1
  },
  header: {
    textAlign: "center",
    background: "#212121",
    color: "#fff"
  },
  card: {
    marginTop: theme.spacing(10)
  }
}));

const initialState = {
  email: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false
};

/**
 * @typedef {Object} State
 * @property {string} email
 * @property {string} password
 * @property {boolean} isButtonDisabled
 * @property {string} helperText
 * @property {boolean} isError
 */

/**
 * @typedef {Object} Action
 * @property {'setEmail'|'setPassword'|'setIsButtonDisabled'|'loginSuccess'|'loginFailed'|'setIsError'} type
 * @property {string|boolean} payload
 */

/**
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload
      };
    default:
      return state;
  }
};

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      state.email.trim() &&
      state.password.trim()
    ) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true
      });
    }
  }, [state.email, state.password]);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      setError("");
      //ログインボタンの無効化
      dispatch({
        type: "setIsButtonDisabled",
        payload: true
      });
      await login(state.email, state.password);
      dispatch({
        type: "loginSuccess",
        payload: "Login Successfully"
      });
      navigate("/dashboard"); // ログイン成功後にダッシュボードにリダイレクト
    } catch (e) {
      console.log(e);
      //エラーメッセージの表示
      switch (e.code) {
        case "auth/network-request-failed":
          setError("通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。");
          break;
        case "auth/weak-password": //バリデーションでいかないようにする
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;
        case "auth/invalid-email": //バリデーションでいかないようにする
          setError("メールアドレスまたはパスワードが正しくありません");
          break;
        case "auth/user-disabled":
          setError("入力されたメールアドレスは無効（BAN）になっています。");
          break;
        default:
          setError("アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。");
      }
      //ログインボタンの有効化
      dispatch({
        type: "setIsButtonDisabled",
        payload: false
      });
    }
  }

  /**
   * @param {React.KeyboardEvent} event
   */
  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin(event);
    }
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleEmailChange = (event) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value
    });
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handlePasswordChange = (event) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={handleLogin}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Login" />
          <CardContent>
            <div>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <TextField
                error={state.isError}
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Email"
                margin="normal"
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
              />
              <TextField
                error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={state.helperText}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            アカウントがない場合はこちらから作成する
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              type="submit"
              disabled={state.isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </ThemeProvider>
  );
};

export default Login;
