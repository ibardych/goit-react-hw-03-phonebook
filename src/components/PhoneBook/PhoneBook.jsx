import { Component } from 'react';
import Section from 'components/Section/Section';
import { PhoneBookContainer } from './PhoneBook.styled';
import Form from 'components/Form/Form';
import ContactsList from 'components/ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import Notification from 'components/Notification/Notification';
import Input from 'components/Form/Input';
import { Button } from 'components/Styled/Button.styled';
import Modal from 'components/Modal/Modal';

const defaultState = {
  contacts: [
    // { id: 'id-1', name: 'Zara Nova', number: '459-12-56' },
    // { id: 'id-2', name: 'Kairos Blackwood', number: '443-89-12' },
    // { id: 'id-3', name: 'Lysandra Steele', number: '645-17-79' },
    // { id: 'id-4', name: 'Xander Vex', number: '227-91-26' },
    // { id: 'id-5', name: 'Vega Starlight', number: '124-87-56' },
  ],
  filter: '',
  modalMessage: '',
  modalOpened: false,
};

class PhoneBook extends Component {
  state = { ...defaultState };

  componentDidMount() {
    const contacts = window.localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  addContact = (e, { name, number }) => {
    e.preventDefault();

    if (
      this.state.contacts.some(contact => {
        return contact.name.toLowerCase() === name.toLowerCase();
      })
    ) {
      this.setState({
        modalMessage: `${name} is already in contacts.`,
        modalOpened: true,
      });
      return;
    }

    const contact = { id: nanoid(), name, number };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteAllContacts = () => {
    this.setState({ contacts: [] });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(item => id !== item.id)],
    }));
  };

  filter = e => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts)
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
  }

  closeModal = e => {
    if (e.target === e.currentTarget)
      this.setState({
        modalMessage: '',
        modalOpened: false,
      });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <PhoneBookContainer>
        <Section title="Phone book">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length ? (
            <>
              <Input
                label="Find contacts by name or number"
                type="text"
                name="filter"
                onChange={this.filter}
                value={this.state.filter}
              />
              <ContactsList
                onDeleteContact={this.deleteContact}
                filter={filter}
                contacts={contacts}
              />
              <Button type="default" onClick={this.deleteAllContacts}>
                Clear all contacts
              </Button>
            </>
          ) : (
            <Notification message="There is no contacts yet" />
          )}
        </Section>
        <Modal
          modalOpened={this.state.modalOpened}
          onCloseModal={this.closeModal}
        >
          {this.state.modalMessage}
        </Modal>
      </PhoneBookContainer>
    );
  }
}

export default PhoneBook;
