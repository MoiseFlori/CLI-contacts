const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action: list, get, add, remove")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      if (!id) {
        console.log("Please provide --id to get a contact");
        return;
      }
      const contact = await contacts.getContactById(id);
      if (contact) {
        console.log(contact);
      } else {
        console.log(`Contact with id=${id} not found`);
      }
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log(
          "Please provide --name, --email and --phone to add a contact"
        );
        return;
      }
      const newContact = await contacts.addContact(name, email, phone);
      console.log("Contact added:", newContact);
      break;

    case "remove":
      if (!id) {
        console.log("Please provide --id to remove a contact");
        return;
      }
      const removed = await contacts.removeContact(id);
      if (removed) {
        console.log(`Contact with id=${id} removed`);
      } else {
        console.log(`Contact with id=${id} not found`);
      }
      break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(options);
