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
      {
        name: "Marco",
        avatar: "_4",
        visible: false,
        messages: [],
      },
      {
        name: "Mauro",
        avatar: "_5",
        visible: false,
        messages: [],
      },
      {
        name: "Marcello",
        avatar: "_7",
        visible: false,
        messages: [],
      },
      {
        name: "Mara",
        avatar: "_io",
        visible: false,
        messages: [],
      },
    ],
    currentContact: false,
    newMessage: "",
    searchContact: [],
    search: "",
    answers : [
      "Ok!",
      "Ciao",
      "Si",
      "No",
      "Grazie",
      "Come stai?",
      "Ti chiamo dopo",
    ],
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
      let lastMessage = this.contacts[contactIndex].messages[this.contacts[contactIndex].messages.length - 1].text;
      if (lastMessage.length > 25) {
        return `${lastMessage.substring(0, 25)} ...`;
      } else {
        return `${lastMessage}`;
      }
    },
    getLastMessageData: function (contactIndex) {
      let message = this.contacts[contactIndex].messages;
      return message[message.length - 1].date;
    },
    getCurrentDate: function () {
      return dayjs().format("DD/MM/YYYY HH:mm:ss");
    },
    checkString: function (str) {
      return str.trim().length > 0;
    },
    saveDraft: function () {
      this.checkString(this.newMessage) ? (this.contacts[this.currentContact].draft = this.newMessage) : this.resetMessage();
    },
    restoreDraft: function () {
      this.contacts[this.currentContact].draft.length > 0 ? (this.newMessage = this.contacts[this.currentContact].draft) : "";
    },
    resetMessage: function () {
      this.newMessage = "";
    },
    messageComposer: function (sender, text = this.newMessage) {
      let date = this.getCurrentDate();
      // let text = this.newMessage;
      let status = sender;
      let newObj = { date, text, status };
      this.contacts[this.currentContact].messages.push(newObj);
      Vue.nextTick(function () {
        app.windowScroll();
      })
      this.resetMessage();
    },
    sendMessage: function (sender) {
      if (this.checkString(this.newMessage)) {
        this.messageComposer(sender);
        if (this.currentContact > 0) {
          this.orderMessage();
          this.currentContact = 0;
        };
        if (!this.contacts[this.currentContact].visible) {
          this.contacts[this.currentContact].visible = true;
        };
        this.resetSearch();
        if (sender == "sent") {
          setTimeout(function () {
            app.autoAnswer()
          }, 1000);
        };
      } else {
        this.resetMessage();
      }
    },
    autoAnswer: function () {
      this.messageComposer("received", this.answers[this.randomNumber(0, this.answers.length - 1)]);
    },
    randomNumber: function (min = 0, max = 9) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    orderMessage: function () {
      let contact = this.contacts[this.currentContact];
      this.contacts.splice(this.currentContact, 1);
      this.contacts.splice(0, 0, contact);
    },
    contactSearch: function () {
      let search = this.search.toLowerCase().trim();
      this.searchContact = [];
      this.contacts.forEach((element, index) => {
        let {name, avatar} = element;
          if (name.toLowerCase().includes(search)) {
            this.searchContact.push([index, {name, avatar}]);
          }
      });
    },
    resetSearch: function () {
      this.searchContact = [];
      this.search != '' ? this.search = '' : '';
    },
    windowScroll: function () {
      document.getElementById("conversation_scroll").scrollTo(0,document.getElementById("conversation_scroll").scrollHeight);
    }
  },
  created: function () {
    let newContacts = [
      "Alice",
      "Achille",
      "Alessandro",
      "Ada",
      "Bruno",
      "Barbara",
      "Camilla",
      "Carlo",
      "Dario",
      "Daniele",
      "Davide",
      "Dafne",
      "Ettore",
      "Elena",
      "Fabiana",
      "Franco",
      "Gerardo",
      "Gabriella",
      "Irene",
      "Iacopo",
      "Ida",
      "Ignazio",
      "Jack",
      "Jacopo",
      "Karen",
      "Lara",
      "Laura",
      "Luigi",
      "Luigina",
      "Mafalda",
      "Martina",
      "Matteo",
      "Nadia",
      "Naomi",
      "Oscar",
      "Orazio",
      "Olga",
      "Paola",
      "Paolo",
      "Palmira",
      "Rachele",
      "Raffaele",
      "Sabrina",
      "Sandro",
      "Sergio",
      "Tamara",
      "Tommaso",
      "Teo",
      "Tiziana",
      "Ugo",
      "Ubaldo",
      "Umberto",
      "Valentina",
      "Vito",
      "Veronica",
      "Vittorio",
      "Valter",
      "Wanda",
      "Yara",
      "Yuri",
      "Zeno",
      "Zoe",
      "Zaira"
    ]
    newContacts.forEach((element) => {
      this.contacts.push(
        {
          name: element,
          avatar: "_default",
          visible: false,
          messages: [],
        },
      )
    });

    this.contacts.forEach((element) => {
      element.draft = "";
    });

    },
});
