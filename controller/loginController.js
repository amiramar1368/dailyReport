import axios from 'axios';

const personal_code=[600882,600880,600712,600723,600500,700159]

export class Login{
    static loginPage(req,res){
        res.render("login",{can_access:"",error:"",layout:"./layout/loginLayout.ejs"})
        }
    static async getUser(req,res){
        const {login,password} = req.body;
        if(login=="" || password==""){
            return res.render("login",{can_access:"",error:"نام کاربری و رمز عبور الزامی می باشد",layout:"./layout/loginLayout.ejs"})
        }
        try {
            const {data} = await axios.post("http://192.168.10.20/api/login",{login,password});
        if(!data.message){
        process.env.token = data.user.token;
        process.env.full_name = data.user.full_name;
        var can_access = personal_code.includes(Number(data.user.personnel_code));
        process.env.can_access = can_access;
         res.render("home",{error:"",can_access})
        }else{
            res.render("login",{can_access:"",error:"کاربری با این مشخصات وجود ندارد",layout:"./layout/loginLayout.ejs"})
        }
        } catch (err) {
            res.render("login",{can_access:"",error:"کاربری با این مشخصات وجود ندارد",layout:"./layout/loginLayout.ejs"})
        }
    }
}