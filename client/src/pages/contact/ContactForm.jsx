import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "./contactForm.css";

const ContactForm = () => {
  const navigate = useNavigate();
  const yo = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(values)
      const result = await axios.post(`contact/message`, values);
      console.log(result);
      navigate("/contact/msgReceived");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        image: "",
        subject: "",
        message: "",

      }}

      onSubmit={yo}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Le nom est requis";
        }
        if (!values.email) {
          errors.email = "L'email est requis";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "L'email est invalide";
        }
        if (!values.phone) {
          errors.phone = "Le téléphone est requis";
        }
        if (!values.image) {
          errors.image = "L'image est facultatif";
        }
        if (!values.subject) {
          errors.subject = "Le sujet est requis";
        }
        if (!values.message) {
          errors.message = "Le message est requis";
        }
        return errors;
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="contactForm">
          {errors.form && <p>{errors.form}</p>}
          <label>
            Nom :
            <Field className="inputEmail" type="text" name="name" />
            {errors.name && <p>{errors.name}</p>}
          </label>
          <br />
          <label>
            Email :
            <Field className="inputEmail" type="email" name="email" />
            {errors.email && <p>{errors.email}</p>}
          </label>
          <br />
          <label>
            Téléphone :
            <Field className="inputPhone" type="text" name="phone" />
            {errors.phone && <p>{errors.phone}</p>}
          </label>
          <br />

          <label>
            Fichier à parcourir :
            {/* <Field className="inputFile" type="text" name="image" /> */}
            {errors.image && <p>{errors.image}</p>}
            <input
              type="file"
              name="myFile"
              id="myFile"
              
              multiple
              accept='image/png image/jpeg image/jpg image/webp'
            />
          </label>

          <br />
          <label>
            Sujet :
            <Field className="inputSubject" type="text" name="subject" />
            {errors.subject && <p>{errors.subject}</p>}
          </label>
          <br />
          <label>
            Message :
            <Field
              className="inputMessage"
              component="textarea"
              name="message"
            />
            {errors.message && <p>{errors.message}</p>}
          </label>
          <br />
          <button
            className="sendDataContactForm"
            type="submit"
            disabled={isSubmitting}
          >
            Envoyer
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

// class ContactForm extends React.Component {
//   state = {
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   }

//   handleChange = event => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     const { name, email, phone, subject, message } = this.state;
//     axios.post(`${API_URL}/contact`, {
//       name,
//       email,
//       phone,
//       subject,
//       message,
//     })
//       .then(res => {
//         // afficher un message de succès ou rediriger vers une autre page
//         console.log("ContactForm.js handleSubmit res.data: ", res.data);
//       })
//       .catch(err => {
//         console.error(err);
//         this.setState({
//             error: "Une erreur s'est produite lors de l'envoi du formulaire.",
//           });
//       });
//   }

//   render() {
//     const { name, email, phone, subject, message, error } = this.state;
//     return (
//       <form className="contactForm" onSubmit={this.handleSubmit}>
//        {error && <p>{error}</p>}
//         <label>
//           Nom* :
//           <input
//           className="inputName"
//             type="text"
//             name="name"
//             value={name}
//             required
//             onChange={this.handleChange}
//           />
//         </label> className="inputEmail"
//         <br />
//         <label>
//           Email* :
//           <input
//
//             type="email"
//             name="email"
//             value={email}
//             required
//             onChange={this.handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Téléphone :
//           <input
//           className="inputPhone"
//             type="phone"
//             name="phone"
//             value={phone}
//             onChange={this.handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Sujet* :
//           <input
//             className="inputSubject"
//             type="text"
//             name="subject"
//             value={subject}
//             required
//             onChange={this.handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Message* :
//           <textarea
//             className="inputMessage"
//             name="message"
//             value={message}
//             required
//             onChange={this.handleChange}
//           />
//         </label>
//         <br />
//         <button className="sendDataContactForm"   type="submit">Envoyer</button>
//       </form>
//     );
//   }
// }

//{
/* <div>
  <form onSubmit={this.handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="phone">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
          <label htmlFor="message">Message</label>
          <input type="text" className="form-control" id="message" name="message" value={this.state.message} onChange={this.handleChange} />
          <button type="submit" className="btn btn-primary">Submit</button>
      </div>
          </form>
</div> */
//}
