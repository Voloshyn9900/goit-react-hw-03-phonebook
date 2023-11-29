import { Component } from 'react';
import { Section, Container, PhoneBook, Title } from './App.styled';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFormSubmit = data => {
    const { contacts } = this.state;

    const hasContact = contacts.some(contact =>
      contact.name.includes(data.name)
    );

    if (hasContact) {
      alert(`This contact already exists: ${data.name}`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, data],
      }));
    }
  };

  updateTopicFilter = newTopic => {
    this.setState({
      filter: newTopic,
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const sortContacts = contacts.filter(contact => {
      const hasName = contact.name.toLowerCase().includes(filter.toLowerCase());
      const hasNumber = contact.number
        .toLowerCase()
        .includes(filter.toLowerCase());
      
      return hasName || hasNumber;
    });

    return (
      <Section>
        <Container>
          <PhoneBook>
            <Title>PhoneBook</Title>
            <Form onSubmitData={this.handleFormSubmit} />
            <Title>Contacts</Title>
            <Filter onChangeFilter={this.updateTopicFilter} />
            <ContactList
              sortContacts={sortContacts}
              onDelete={this.deleteContact}
            />
          </PhoneBook>
        </Container>
      </Section>
    );
  }
}
