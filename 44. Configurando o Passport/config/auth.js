import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

const PassportConfig = (passport) => {
    passport.use(new LocalStrategy({usernameField: "email"}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: "Usuário não encontrado"});
            }

            bcrypt.compare(senha, usuario.senha, (err, batem)=>{
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Senha incorreta"});
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}

export default PassportConfig;