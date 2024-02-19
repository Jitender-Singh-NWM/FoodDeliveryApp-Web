const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const transporter = require('./emailConfig'); // Adjust the path accordingly
var tken='';


const app = express();
app.use(express.json());
app.use(cors());
const jwt = require('jsonwebtoken');  // Add this line
passport.use(new LocalStrategy(FormDataModel.authenticate()));
passport.serializeUser(FormDataModel.serializeUser());
passport.deserializeUser(FormDataModel.deserializeUser());
const PasswordResetModel = require('./models/PasswordReset'); // Add this line


mongoose.connect('mongodb://127.0.0.1:27017/practice_mern');

app.get('/reset-password', (req, res) => {
    res.redirect('http://127.0.0.1:5173/PasswordResetpage')
});

app.post('/update-password', async (req, res) => {
    const { email, password } = req.body;
  console.log('tken==>',tken);
  console.log('email==>',email);
  console.log('newPassword==>',password);
    try {
      // Verify the token
      //const decoded = jwt.verify(token, 'your_secret_key');
  
      // Find the user based on the email
      const user = await FormDataModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      // Check if the token exists in the PasswordReset collection
      const passwordResetRecord = await PasswordResetModel.findOne({ user: user._id });
  
      if (!passwordResetRecord) {
        return res.status(400).json('Invalid or expired token');
      }
  
      // Hash the new password before updating
      //const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = password;
      await user.save();
  
      // Remove the used token from the PasswordReset collection
      //await PasswordResetModel.deleteOne({ user: user._id });
  
      res.json('Password updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
  });
  
  // ... (remaining code)
  
  
/*app.get('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;
  
    // Verify the token
    jwt.verify(token, tken, (err, decoded) => {
      /*if (err) {
        return res.status(401).json('Invalid or expired token');
      }*/
  
      // Update the user's password in the database
      /*FormDataModel.findOneAndUpdate(
        { email: decoded.email },
        { $set: { password: newPassword } },
        { new: true }
      )
        .then(() => {
          // Delete the used token from the database
          PasswordResetModel.deleteOne({ email: decoded.email, token })
            .then(() => {
              res.json('Password reset successful');
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json('Internal Server Error');
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json('Internal Server Error');
        });
    });
  });*/
  
  app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log('req==>',req);
    try {
      const user = await FormDataModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      // Generate a unique token
      const token = jwt.sign({ email }, 'test', { expiresIn: '1h' });
  
      // Save the token to the database
      await PasswordResetModel.create({ user: user._id, token });
      tken=token;
      // Send an email to the user with the reset link (you need to implement this part)
      const resetLink = `http://localhost:3001/reset-password?token=${token}`;
      // Implement your email sending logic here

      PasswordResetModel.create({ user: user._id, token })
      .then(() => {
        // Send an email to the user with the reset link
        const resetLink = `http://localhost:3001/reset-password?email=${email}`;
        //const resetLink = `http://localhost:3001/reset-password?token=${token}`;
        //const resetLink = `http://localhost:3001/PasswordResetpage.jsx`;
        const mailOptions = {
          from: 'jithu.cbit@gmail.com',
          to: email,
          subject: 'Password Reset',
          text: `Click the following link to reset your password: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Email sent: ' + info.response);
          res.json('Password reset email sent!');
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json('Internal Server Error');
      });
  
      res.json('Password reset email sent!');
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
  });
  
  

/*
app.post('/forgot-password', (req, res) => {
    console.log("req==>",req.body);
    const { email } = req.body;
  
    FormDataModel.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(404).json('User not found');
        }
  
        // Generate a unique token
        const token = jwt.sign({ email }, 'test', { expiresIn: '1h' });
  
        // Save the token to the database
        PasswordResetModel.create({ user: user._id, token })
          .then(() => {
            // Send an email to the user with the reset link
            const resetLink = `http://localhost:3001/reset-password?token=${token}`;
            const mailOptions = {
              from: 'your_email@gmail.com',
              to: email,
              subject: 'Password Reset',
              text: `Click the following link to reset your password: ${resetLink}`,
            };
  
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Email sent: ' + info.response);
              res.json('Password reset email sent!');
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json('Internal Server Error');
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json('Internal Server Error');
      });
  });*/
  




app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    var bcrypt = require('bcryptjs');

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
          const salt = bcrypt.genSaltSync(10)
          const hashedPassword = bcrypt.hashSync(password, salt)
          /*bcrypt.compare("hashedPassword", hash).then((res) => {
            // res === true
        });*/
        //var ispassed=bcrypt.compareSync(hashedPassword, hash); // true

        
            // If user found then these 2 cases
            //if(user.password === password) {
        //var ispassed=bcrypt.compareSync(hashedPassword, hash); // true
        /*if(ispassed){
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }*/
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                  res.json("Success");
              } else {
                  res.json("Wrong password");
              }
          });

        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});