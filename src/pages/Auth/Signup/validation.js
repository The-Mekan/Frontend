import * as yup from "yup";


const validations=yup.object().shape({
    email:yup.string().email("geçerli bir email girin").required("zorunlu alan"),
    password:yup.string().min(5,"min 5 karakter olmalıdır").required(),
    passwordConfirm:yup.string().oneOf([yup.ref("password")],"parolalar uyuşmuyor").required(),
});

export default validations;