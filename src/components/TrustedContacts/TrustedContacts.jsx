import { useEffect, useState } from "react";
import "./TrustedContacts.css";

function TrustedContacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem("trustedContacts");

    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const pickContact = async () => {
    if (!("contacts" in navigator)) {
      alert("Contact picker is not supported on this device.");
      return;
    }

    try {
      const selectedContacts = await navigator.contacts.select(
        ["name", "tel"],
        { multiple: false }
      );

      if (selectedContacts.length > 0) {
        setName(selectedContacts[0].name?.[0] || "");
        setPhone(selectedContacts[0].tel?.[0] || "");
      }
    } catch (error) {
      console.log("Contact selection cancelled.");
    }
  };

  const addContact = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please enter name and phone number.");
      return;
    }

    const newContact = {
      id: Date.now(),
      name: name,
      phone: phone,
    };

    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);

    localStorage.setItem(
      "trustedContacts",
      JSON.stringify(updatedContacts)
    );

    setName("");
    setPhone("");
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== id
    );

    setContacts(updatedContacts);

    localStorage.setItem(
      "trustedContacts",
      JSON.stringify(updatedContacts)
    );
  };

  return (
    <section className="trusted-contacts">

      <div className="section-heading">
        <span>EMERGENCY NETWORK</span>

        <h2>Trusted Contacts</h2>

        <p>
          Add people who should receive your emergency alert.
        </p>
      </div>

      <div className="contact-card">

        <button
          type="button"
          className="contact-picker-btn"
          onClick={pickContact}
        >
          Select from Phone Contacts
        </button>

        <form
          className="contact-input"
          onSubmit={addContact}
        >

          <input
            type="text"
            placeholder="Contact name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit">
            Add Contact
          </button>

        </form>

        <div className="contact-list">

          {contacts.map((contact) => (
            <div
              className="contact-item"
              key={contact.id}
            >

              <div>
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default TrustedContacts;