import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactsList/ContactsList';
import Filter from './filter/Filter';
import s from '../components/contactForm/ContactForm.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    const repeatName = this.state.contacts.find(contact => {
      return contact.name.toLowerCase() === newContact.name.toLowerCase();
    });
    if (repeatName) {
      alert(`${newContact.name} ia already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
    }));
  };

  handleChangeFilterForm = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleFilterContact = () => {
    const { contacts, filter } = this.state;
    const filteredContact = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContact;
  };

  handleDelate = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  componentDidMount() {
    const contactItem = localStorage.getItem('contacts');
    console.log(contactItem);
    const parsedContacts = JSON.parse(contactItem);
    console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h1 className={s.title}>Contacts</h1>
        <Filter
          filter={this.state.filter}
          filterForm={this.handleChangeFilterForm}
        />
        <ContactList
          contacts={this.handleFilterContact(this.state.contacts)}
          delate={this.handleDelate}
        />
      </div>
    );
  }
}
export default App;
