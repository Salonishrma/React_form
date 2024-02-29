import React, { ChangeEvent, FormEvent, useState } from "react";
import './Form.css'
interface FormContent {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  country: string;
  qualifications: {
    tenth:boolean;
    twelfth:boolean;
    ug:boolean;
    pg:boolean;
  };
  subscribe: boolean;
}

const Form: React.FC = () => {
  const [formContent, setFormContent] = useState<FormContent>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    gender: '',
    country: '',
    qualifications: {
        tenth:false,
        twelfth:false,
        ug:false,
        pg:false,
    },
    subscribe: false,
  });
  const [formError, setFormError] = useState<Record<string, string>>({});

  const manageChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormContent({
      ...formContent,
      [name]: inputValue,
    });
  };
  const manageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent default submission

    const error: Record<string, string> = {}; //if empty value is passed
    if (!formContent.firstname.trim()) {
      //trim used to remove whitespace (spaces, tabs, etc.)
      error.firstname = " firstname is required";
    }

    if (!formContent.username.trim()) {
      error.username = " username is required";
    }

    if (!formContent.email.trim()) {
      error.email = " email is required";
    } else if (!/\S+@\S+\.\S+/.test(formContent.email)) {
      error.email = " Invalid Email Address";
    }
    
    if (!formContent.phone.trim()) {
        error.phone = ' Phone number is required';
    } else if (!/^\d{10}$/.test(formContent.phone.trim())) {
        error.phone = ' Invalid phone number';
    }

    if (!formContent.gender) {
      error.gender = " Gender is required";
    }

    if (!formContent.country) {
      error.country = " country is required";
    }
    setFormError(error);
    if (Object.keys(error).length === 0) {
      alert(
        " Your form is Submitted Successfully.Thank You. Have a Good Day",
      );
      //clear all data after submit
        setFormContent({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        country: '',
        qualifications: {
            tenth:false,
            twelfth:false,
            ug:false,
            pg:false,
        },
        subscribe:false,
        });
    }
    else {
       alert('Please fix the errors in the form before submitting.');
    }
  };
  
 
  const handleQualification = (qualification: string) => {
    setFormContent((prevContent) => ({
      ...prevContent,
      qualifications: {
        ...prevContent.qualifications,
        [qualification as keyof typeof prevContent.qualifications]: !prevContent.qualifications[qualification as keyof typeof prevContent.qualifications],
      },
    }));
  };
  
 

  return (
    <form className="form-body" onSubmit={manageSubmit}>
      <div>
        <label htmlFor="firstname">First Name :</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formContent.firstname}
          onChange={manageChange}
        />
        {formError.firstname &&
        <span className="error">{formError.firstname}</span>}
      </div>

      <div>
        <label htmlFor="lastname">Last Name :</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formContent.lastname}
          onChange={manageChange}
        />
        {formError.lastname &&
        <span className="error">{formError.lastname}</span>
        }
      </div>

      <div>
        <label htmlFor="username">UserName :</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formContent.username}
          onChange={manageChange}
        />
        {formError.username &&
        <span className="error">{formError.username}</span>
        }
      </div>

      <div>
        <label htmlFor="email">EmailAddr&nbsp;&nbsp;:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formContent.email}
          onChange={manageChange}
        />
        {formError.email &&
          <span className="error">{formError.email}</span>
        }
      </div>
      
      <div>
        <label htmlFor="phone">PhoneNo&nbsp; &nbsp;:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formContent.phone}
          onChange={manageChange}
        />
        {formError.phone &&
          <span className="error">{formError.phone}</span>
        }
      </div>

      <div>
        <label>Gender :</label>
        
          <label className="container1" >
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formContent.gender === 'male'}
              onChange={manageChange}
            />
            Male
          </label>
          <label className="container1">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formContent.gender === 'female'}
              onChange={manageChange}
            />
            Female
          </label>
          <label className="container1">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formContent.gender === 'Other'}
              onChange={manageChange}
            />
            Other
          </label>

        {formError.gender 
        && <span className="error">{formError.gender}</span>}
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select
         name="country" 
         id="country"
         value={formContent.country}
         onChange={manageChange}
         >
         <option value="">Select Country</option>
         <option value="india">INDIA</option>
         <option value="usa">USA</option>
         <option value="canada">CANADA</option>
         <option value="morocco">MOROCCO</option>
         <option value="indonesia">INdONESIA</option>
        </select>
        {formError.country 
        && <span className="error">{formError.country}</span>}
      </div>
      

     <div>
      <label>Qualification:</label>
        <label className="container">
            <input 
            type="checkbox"
            name="tenth"
            checked={formContent.qualifications.tenth} 
            onChange={()=>handleQualification('tenth')}
            />
            10th
        </label>
       
        <label className="container">
            <input 
            type="checkbox"
            name="twelfth"
            checked={formContent.qualifications.twelfth} 
            onChange={()=>handleQualification('twelfth')}
            />
            12th
        </label>
     
        <label className="container">
            <input 
            type="checkbox"
            name="ug"
            checked={formContent.qualifications.ug} 
            onChange={()=>handleQualification('ug')}
            />
            UG
        </label>
      
        <label className="container">
            <input 
            type="checkbox"
            name="pg"
            checked={formContent.qualifications.pg} 
            onChange={()=>handleQualification('pg')}
            />
            PG
        </label>
     </div>
     
      <div className="sub">
        <label>
            <input 
            type="checkbox"
            name="subscribe"
            checked={formContent.subscribe} 
            onChange={manageChange}
            />
            Subscribe Our Channel For Updates
        </label>
      </div>

      <div>
        <button className="sub-mit"type="submit">Submit</button>
      </div>
      
    </form>
  );
};
export default Form;
