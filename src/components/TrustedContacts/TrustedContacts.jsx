import { useEffect, useState } from "react";
import "./TrustedContacts.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function TrustedContacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // GET CONTACTS
  const getContacts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/contacts/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.log("Get contacts error:", error);
    }
  };

  // PHONE CONTACT PICKER
  const pickContact = async () => {
    if (!("contacts" in navigator)) {
      alert("Contact picker is not supported on this device.");
      return;
    }

    try {
      const selectedContacts = await navigator.contacts.select(
        ["name", "tel"],
        {
          multiple: false,
        }
      );

      if (selectedContacts.length > 0) {
        setName(selectedContacts[0].name?.[0] || "");
        setPhone(selectedContacts[0].tel?.[0] || "");
      }
    } catch (error) {
      console.log("Contact selection cancelled.");
    }
  };

  useEffect(() => {
    if (user && token) {
      getContacts();
    }
  }, []);

  // ADD CONTACT
  const addContact = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please enter name and phone number.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/contacts/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            phone,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setContacts(data.contacts);

        setName("");
        setPhone("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Add contact error:", error);
    }
  };

  // DELETE CONTACT
  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/contacts/${user.id}/${contactId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setContacts(data.contacts);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Delete contact error:", error);
    }
  };

  return (
    <div className="trusted-contacts-page">

      <div className="trusted-contacts-header">
        <span className="trusted-badge">
          YOUR SAFETY NETWORK
        </span>

        <h1>
          Trusted <span>Contacts</span>
        </h1>

        <p>
          Add people you trust so they can be contacted during
          an emergency.
        </p>
      </div>

      <div className="trusted-contacts-container">

        {/* ADD CONTACT */}

        <div className="add-contact-card">

          <h2>Add Trusted Contact</h2>

          <p>
            Keep your emergency contacts ready when you need help.
          </p>

          <button
            type="button"
            className="contact-picker-btn"
            onClick={pickContact}
          >
            Choose From Phone Contacts
          </button>

          <form onSubmit={addContact}>

            <div className="input-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Contact name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button type="submit">
              Add Contact
            </button>

          </form>

        </div>

        {/* SAVED CONTACTS */}

        <div className="saved-contacts-card">

          <div className="saved-contacts-heading">

            <h2>Your Contacts</h2>

            <span>{contacts.length}</span>

          </div>

          {contacts.length === 0 ? (

            <div className="no-contacts">

              <p>No trusted contacts added yet.</p>

              <span>
                Add at least one contact for emergency alerts.
              </span>

            </div>

          ) : (

            <div className="contacts-list">

              {contacts.map((contact) => (

                <div
                  className="contact-item"
                  key={contact._id}
                >

                  <div>
                    <strong>{contact.name}</strong>

                    <p>{contact.phone}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteContact(contact._id)}
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default TrustedContacts;