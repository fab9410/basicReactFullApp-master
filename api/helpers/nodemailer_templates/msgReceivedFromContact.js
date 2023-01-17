let yoyo =
  "font-size: 1.5em; text-decoration: underline; color: blue; font-weight: 200;margin: 0;padding: 0;text-align: center; ";
let styleSubject = 
  "font-size: 1.5em; color: red; font-weight: 200;margin: 0;padding: 0;text-align: center; ";

export const msgSendToAdmin = (name, email, message, phone, subject) => {
  console.log(name, email, message, phone, "req.body msgSendToAdmin dans template");
  let result = `<div style="${yoyo}">${name} : vous a envoyé un message : </div> <br> <br>

  <div style="${styleSubject}"> Subject : "${subject}"</div>

    ${message} <br> <br>

    <div> Vous pouvez lui répondre directement :  </div> 

 <div> par email  :  ${email}  </div> 
  <div> par téléphone :  ${phone}  </div> `;

  return result;
};
