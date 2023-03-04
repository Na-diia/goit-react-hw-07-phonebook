import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import styles from './contact-list.module.css';
import { selectContacts, selectFilter, selectLoading, selectError } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/contacts-operations';

export const ContactList =() => {
  const contactsValue = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const findContact = () => {
    if(!filter) return contactsValue;
    
      return contactsValue.filter(contact => 
         contact.name.toLowerCase().includes(filter)
        );
  };

  const foundContacts = findContact();

  const contacts = foundContacts.map(({id, name, phone}) => {
    return (<li key={id}><p className={styles.item}>{name} : {phone}</p>
    <button type="button" className={styles.delete}
    onClick={() => dispatch(deleteContact(id))}>Delete</button></li>)});

  return(
    <ul className={styles.list}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {contactsValue < 1 && <p>Contact list is empty!</p>}
      {contacts}
    </ul>
  )
};
