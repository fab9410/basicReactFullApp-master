import dotenv from "dotenv";
dotenv.config();
import { createTransport } from "nodemailer";
import { getUserByEmail } from "../requests/users.js";
import { msgSendToAdmin } from "./nodemailer_templates/msgReceivedFromContact.js";
import { registrationWelcome } from "./nodemailer_templates/registration.js";

const Transport = createTransport(
  /* 'SMTP', */ {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PWD,
    },
  }
);

// MOT DE PASSE OUBLIE
const forgotPasswordMail = async (req, res, next) => {
  let user = await getUserByEmail(req.body.email);
  const mailOptions = {
    to: `${req.body.email}`,
    bcc: `${process.env.EMAIL_USER}`,
    from: `${process.env.EMAIL_USER}`,
    subject: "Mot de passe oublié",
    html: `Voici votre code pour réinitialiser votre mot de passe : <br>
      <a href="https://${req.headers.host}/api/auth/resetPassword/${user[0].emailToken}"> Cliquez ici pour renouveler votre mot de passe. </a> <br>`,
  };
  Transport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
      res.status(200).send("Email Envoyé");
    }
  });
};

// INSCRIPTION
const SendMail = async (req, res) => {
  console.log(req.body.email)
  let user = await getUserByEmail(req.body.email);
  console.log(user)
  const mailOptions = {
    to: `${req.body.email}`,
    bcc: `${process.env.EMAIL_USER}`,
    from: `${process.env.EMAIL_USER}`,
    subject: "CValidation d'email pour votre inscription",
    text: "",
    html: `${registrationWelcome(user.email, user.emailToken, req.headers.host)}`,
  //  html: `voici votre lien de validation d'inscription : <br>
  //  <a href="https://${req.headers.host}/api/auth/confirmation/${user[0].emailToken}/${user[0].email}"> Cliquez ici pour valider votre inscription </a> <br>`,
  };
  /* smtp */
  Transport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Envoyé");
      res.status(201).json({ user });
    }
  });
};

// réception d'une demande de contact à partir du formulaire de contact
const contactSendMsgToAdmin = async (req, res, next) => {
 await console.log(msgSendToAdmin(req.body.name, req.body.message, req.body.email, req.body.subject));
  const mailOptions = {
    //to: `${req.body.email}`,
    bcc: "info@mayak-conseil.com",
    //from: "info@mayak-conseil.com",
    subject: "Message du site XXXXX",
    text: "",
    html: ` ${msgSendToAdmin(req.body.name, req.body.email, req.body.message, req.body.phone, req.body.subject)} `,
 // html: `${req.body.name} vous a envoyé un message : <br> <br>
  // ${req.body.message} <br> <button style="background-color:red"> <a href="mailto:${req.body.email}"> Répondre à ${req.body.name} </a> </button> <br> <br>`,
  };
  /* smtp */
  Transport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Envoyé");
      next();
      //res.status(201).json({ user });
    }
  });
};

const confirmationClientEmail = async (req, res) => {
  const user = await getUserByEmail(req.body.email);
  const mailOptions = {
    to: `${req.body.email}`,
    bcc: `${process.env.EMAIL_USER}`,
    from: `${process.env.EMAIL_USER}`,
    subject: "Mail de confirmation",
    text: "",
    html: `Bonjour ${req.body.name} ${req.body.email}, <br>
    Nous avons bien reçu votre demande de devis. <br>
    Nous vous recontacterons dans les plus brefs délais. <br>
    Cordialement, <br>
    L'équipe Mayak Conseil`,
  };
  Transport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email de confirmation envoyé");
      res.status(201).json({ user });
    }
  });
};


const singleClientEmail = async (req, res) => {
  const user = await getUserByEmail(req.body.email);
  const mailOptions = {
    to: `${req.body.email}`,
    bcc: "",
    from: "",
    subject: "Votre demande de devis a bien été prise en compte",
    text: "",
    html: `Bonjour ${req.body.firstName} ${req.body.lastName}, <br>
    Nous avons bien reçu votre demande de devis. <br>
    Nous vous recontacterons dans les plus brefs délais. <br>
    Cordialement, <br>
    L'équipe Mayak Conseil`,
  };
  Transport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Envoyé");
      res.status(201).json({ user });
    }
  });
};

const multiClientEmail = async (req, res) => {
  const users = await getUserByEmail(req.body.email);
  const mailOptions = {
    to: `${req.body.email}`,
    bcc: "",
    from: "",
    subject: "Votre demande de devis a bien été prise en compte",
    text: "",
    html: `Bonjour ${req.body.firstName} ${req.body.lastName}, <br>
    Nous avons bien reçu votre demande de devis. <br>
    Nous vous recontacterons dans les plus brefs délais. <br>
    Cordialement, <br>
    L'équipe Mayak Conseil`,
  };
  Transport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Envoyé");
      res.status(201).json({ users });
    }
  });
};

export { SendMail, forgotPasswordMail, contactSendMsgToAdmin, singleClientEmail, multiClientEmail, confirmationClientEmail };
