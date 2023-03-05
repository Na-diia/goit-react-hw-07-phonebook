import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import styles from './contact-form.module.css';
import { selectContacts } from "redux/selectors";
import { addContact } from "redux/contacts-operations";

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const formChange = ({target}) => {
    const {name, value} = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    };
  };

  const isExist = contactName => {
    return contacts.some(({ name }) => name.toLowerCase() === contactName.toLowerCase());
  };

  const  handleSubmit = (event) => {
    event.preventDefault();
    if (isExist(name)) {
      toast.warn(`${name} is already in contacts!`, {
        theme: "dark"
      });
      return;
    } else{
     dispatch(addContact({name, phone}));
     toast.info("Successfully!", {
      theme: "dark"
     });
     reset();
    };
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
       <form autoComplete="on"
       className={styles.form}
       onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>Name
           <input className={styles.input} 
          placeholder="Jacob Mercer"
          type="text" name="name" 
          value={name}
          onChange={formChange}
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required/>
        </label>
        <label htmlFor="phone" className={styles.label}>Number
        <input className={styles.input}
        placeholder=" 257-42-21"
        type="tel"
        value={phone}
        onChange={formChange}
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required/>
        </label>
        <button type="submit" className={styles.btn}> Add contact</button>
       </form>
  )
};