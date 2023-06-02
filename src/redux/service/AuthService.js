import { httpPublic } from "./httpApi";

const Login = (body) => {
    return httpPublic.post("login", body);
};

const Register = (body) => {
    return httpPublic.post("register", body);
};

const AuthService = {
    Login,
    Register,
};

export default AuthService;
