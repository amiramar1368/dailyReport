
export class HomePage{
  
    static mainPage(req,res) {
        var can_access =process.env.can_access;
        res.render("home",{error:"",can_access});
     }

}