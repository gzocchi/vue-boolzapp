var app = new Vue({
  el: "#root",
  data: {
    user: {
      name: "Giorgio",
      avatar: "_8",
      visible: true,
    },
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Ricordati di dargli da mangiare",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            text: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            text: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            text: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            text: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            text: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            text: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            text: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "_6",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            text: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            text: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
    ],
    currentContact: 0,
    newMessage: "",
  },
  methods: {
    setCurrentContact: function (contactIndex) {
      this.currentContact = contactIndex;
    },
    getContactImage: function () {
      return `img/avatar${this.contacts[this.currentContact].avatar}.jpg`;
    },
    getObjImage: function (obj) {
      return `img/avatar${obj.avatar}.jpg`;
    },
    getLastMessageText: function (contactIndex) {
      // let message = this.contacts[contactIndex].messages;
      // let lastMessage = message[message.length - 1].text.substring(0, 30);
      // return `${lastMessage} ...`;
      let lastMessage = this.contacts[contactIndex].messages[this.contacts[contactIndex].messages.length - 1].text;
      if (lastMessage.length > 30) {
        return `${lastMessage.substring(0, 30)} ...`;
      } else {
        return `${lastMessage}`;
      };
    },
    getLastMessageData: function (contactIndex) {
      let message = this.contacts[contactIndex].messages;
      return message[message.length - 1].date;
    },
    getCurrentDate: function () {
      return  dayjs().format("DD/MM/YYYY HH:mm:ss");
    },
    checkMessage: function (str) {
      return str.trim().length > 0
    },
    saveDraft: function () {
      this.checkMessage(this.newMessage) ? this.contacts[this.currentContact].draft = this.newMessage : this.resetMessage();
    },
    restoreDraft: function () {
      this.contacts[this.currentContact].draft.length > 0 ? this.newMessage = this.contacts[this.currentContact].draft : "";
    },
    resetMessage: function() {
      this.newMessage = "";
    },
    messageComposer: function (sender) {
      let date = this.getCurrentDate();
      let text = this.newMessage;
      let status = sender;
      let newObj = { date, text, status };
      this.contacts[this.currentContact].messages.push(newObj);
      this.resetMessage();
    },
    sendMessage: function (sender) {
      this.checkMessage(this.newMessage) ? this.messageComposer(sender) : this.resetMessage();
      this.orderMessage();
      this.currentContact = 0;
    },
    orderMessage: function () {
      let contact = this.contacts[this.currentContact];
      this.contacts.splice(this.currentContact, 1);
      this.contacts.splice(0,0,contact);
    },
  },
  created: function () {
    this.contacts.forEach(element => {
      element.draft = "";
    });
  }
});
