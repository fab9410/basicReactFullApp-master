let yoyo =
  "font-size: 1.5em; text-decoration: underline; color: blue; font-weight: 200;margin: 0;padding: 0;text-align: center; ";


export const registrationWelcome = (email, emailToken, headers ) => {
  console.log(emailToken, email,  "req.body registration dans template");
  let result = `<div style="${yoyo}">bienvenue </div> 
  <a href="https://${headers}/api/auth/confirmation/${emailToken}/${email}"> Cliquez ici pour valider votre inscription </a> <br>
   `;

  return result;
};
