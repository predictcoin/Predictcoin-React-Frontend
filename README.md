# Introduction

The CroPredict frontend application contains the website and the dapp. They are accessible in the [src/views](src/views) folder as home and dapp respectively.

This documentation will focus on the Dapp.

## Dapp

The dapp is built using React as the main UI framework, scss for styling, typescript for type checks, ethersjs for web3 and typechain for providing types for contracts.

It is built using clean architecture. This means the dapp is divided into different parts that interact with each other. It is divided into 4 main parts. Here's the list arranged according to how data flows through the dapp.

- Domain
- Infrastructure
- Controllers
- User Interface (UI)

This allows different parts of the dapp to function completely independent of each other. Other parts except the UI are found in the [application](src/views/Dapp/application) folder.

### User Interface 👩🏾‍💼

The user interface consists of the various ui components the user sees on the dapp. The user interface consists of these folders under the Dapp folder:

- Components: Contains the React UI components
- Hooks: React hooks
- Pages: Pages in the dapp.
- Models: Types used by Typescript to type check data
- Data: Fake values used as placeholders to substitute real world data, these are only used for development

### Domain 🏠

They define the types for all the data used by the dapp and functions used to manipulate this data. They are majorly types for data stored on the smartcontract. These types are mostly generated using Typechain, the [typechain](src/views/Dapp/typechain) folder defines all the types generated from the smartcontract using typechain.

Consist of the domain and usecases folders under application.

- Domain: Contains types for all the data used by the dapp.
- Usecases: Contains the functions used to manipulate data defined by the domain. It does things like retrieve data from smartcontracts and update these data.

### Infrastructure 🏗️

This contains external resources used to manipulate the data defined by the domain. The infrastructure consists of:

- Redux: This is used for state management of data defined by domains. Redux stores are defined by types in the domain and its actions are carried out using the usecases.
- Connectors: Provides basic wallet functionality such as connect and disconnect and more for the wallet domain.

### Controllers 🛠️

The controllers help to provide data defined by the domain to the user interface. They serve as an interface between the ui and the domain.
They are written as hooks to provide necessary updates when there is a change in data. These hooks also listen for events on the smart contracts and update the domain data managed by the Redux infrastructure, and since they are hooks a change in the data stored, updates the UI.

Let's have a look at a simple example of how data passes through the app.
E.g: Here's how prediction data gets to the UI.

1. Prediction data needed from the prediction smart contract such as currentRound have their types defined in the domain.
2. Usecases are written to fetch these data from the smart contract and manipulate them to the types stored in the domain.
3. The Redux infrastructure, uses the usecases to get the data in its actions, and stores this data in its store. The store structure is defined by the domain.
4. The controllers then reach out to the Redux store and get these data, manipulate them to formats needed by the UI and return them. It also provides methods the UI can call to manipulate the data.
5. The UI calls uses the controllers to access this data and also uses methods it provides to update them.
