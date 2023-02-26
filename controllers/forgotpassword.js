const path = require('path');
const rootDir = require('../util/path');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt');


const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');



exports.getForgotpasswordpage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'forgotpassword.html'))
}

exports.postForgotpassword = (req, res, next) => {
    const userMail = req.body.email;

    // console.log("user mail---->>",userMail);

    User.findOne({ where: { emailId: userMail } })
        .then(user => {
            console.log("user mail----->>>>>>>", user.emailId);

            if (user) {
                const id = uuid.v4();
                user.createForgotpassword({ id, active: true })
                    .catch(err => {
                        throw new Error(err);
                    })

                //nodemailer functionalities:--->
                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "abhishek.112031@gmail.com",
                        pass: process.env.NODE_MAILER_PASSWORD
                    }
                });

                let details = {
                    from: "abhishek.112031@gmail.com",
                    to: userMail,
                    subject: 'Sending with SendGrid is Fun',
                    text: 'and easy to do anywhere, even with Node.js',
                    html: `<a href="http://localhost:3000/resetpassword/${id}">Reset password</a>`
                }
                mailTransporter.sendMail(details, (err) => {
                    if (err) {
                        return res.status(404).json({ message: 'something went wrong!!' })
                    }
                    else {
                        res.status(201).json({ message: 'reset password link sent to your emailId' })
                    }
                });
            }
            else {
                return res.status(404).json({ message: 'uer not found !!!' });

            }




        })
        .catch(err => {
            return res.status(404).json({ message: 'uer not found !!!' })

        })



}
exports.getResetpasswordPage = (req, res, next) => {
    const id = req.params.id;
    Forgotpassword.findOne({ where: { id } })
        .then((forgotpw) => {
            if (forgotpw) {

                console.log(forgotpw)
                forgotpw.update({ active: false });

                res.status(200).send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>
            <form action="/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
        </html>`
                )
                res.end()
            }
        })

}
// exports.getResetpasswordPage = (req, res, next) => {
//     const id = req.params.id;
//     Forgotpassword.findOne({ where: { id } })
//         .then((forgotpw) => {
//             if (forgotpw) {

//                 console.log(forgotpw)
//                 forgotpw.update({ active: false });

//                 res.status(200).sendFile(path.join(rootDir,'views','getresetpwpage.html')
        
//                 )
               
//             }
//         })

// }
exports.updatePassword=(req,res,next)=>{
    const {newpassword}=req.query;
    const {updateid}=req.params;
    Forgotpassword.findOne({where:{id:updateid}})
    .then(resetpasswordReq=>{
        User.findOne({where:{id:resetpasswordReq.userId}})
        .then(user=>{
            if(user){

              
                    bcrypt.hash(newpassword,10,function(err,hash){
                        if(err){
                            throw new Error(err);
                        }
                        user.update({password:hash})
                        .then(()=>{
                            res.status(201).json({message: 'Successfuly update the new password'});
                        })
                    })
    
                
            }
            else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            
        })
    })
}