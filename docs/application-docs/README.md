*Work in Progress !*

# Etheruem Chat-App - Documentation

## Abstract

<p style="text-align: justify">
The world has become a globalised service society in recent years, with payments increasingly being made online by third
parties such as banks and other service providers. Users need to trust that this third party will execute transactions
correctly and that data will be managed correctly so that it is not accessible to the public. Cryptocurrencies offer a
fully decentralised way of executing and storing transactions using blockchain technology, so that there is no need to
trust any third party. With the Ethereum network, it is also possible to program applications on the blockchain. The
following application is designed to provide a decentralised and anonymous way of chatting and sending money to friends
using the <a href="https://ethereum.org/">Ethereum</a> network and the browser extension <a href="https://metamask.io/">
Metamask</a>.
</p>

## Table of Contents

- #### [Introduction](#1-Introduction)
- #### [Initial position](#2-Initial-position)
    * #### [Cryptocurrencies](#21-Cryptocurrencies)
        + #### [Development of cryptocurrencies](#211-Development-of-cryptocurrencies)
        + #### [How transactions work in a blockchain](#212-How-transactions-work-in-a-blockchain)
        + #### [Ethereum and Smart Contracts](#213-Ethereum-and-Smart-Contracts)
        + #### [Potential and current purpose of cryptocurrencies](#214-Potential-and-current-purpose-of-cryptocurrencies)
    * #### [Weaknesses of current transaction platforms](#22-Weaknesses-of-current-transaction-platforms)
    * #### [Current state of research](#23-Current-state-of-research)
    * #### [Decentralised transaction mechanisms as a solution approach](#24-Decentralised-transaction-mechanisms-as-a-solution-approach)
- #### [The development of an application for decentralised transactions](#3-The-development-of-an-application-for-decentralised-transactions)
    * #### [Objectives and methodology](#31-Objectives-and-methodology)
        + #### [Functions and purpose of the application](#311-Functions-and-purpose-of-the-application)
        + #### [Realisation](#312-Realisation)
    * #### [Structure and functioning of the application](#32-Structure-and-functioning-of-the-application)
        + #### [Communication with the user - React.js](#321-Communication-with-the-user---React.js)
        + #### [Communication with Ethereum - Metamask](#322-Communication-with-Ethereum---Metamask)
        + #### [Data storage and processing - Firebase](#323-Data-storage-and-processing---Firebase)
    * #### [Conventional and innovative elements of the application](#33-Conventional-and-innovative-elements-of-the-application)
    * #### [Outlook](#34-Outlook)
        + #### [Decentralised data storage with IPFS](#341-Decentralised-data-storage-with-IPFS)
        + #### [ERC-20 token integration](#342-ERC-20-token-integration)
        + #### [Group chats with smart contracts](#343-Group-chats-with-smart-contracts)
- #### [Documentation](#4-Documentation)
    * #### [Representation of the work process](#41-Representation of the work process)
        + #### [First planning and sketches](#411-First-planning-and-sketches)
        + #### [Development of a first messenger application](#412-Development-of-a-first-messenger-application)
        + #### [Extended planning](#413-Extended-planning)
        + #### [Development of a private messenger application](#414-Development-of-a-private-messenger-application)
        + #### [Extending the application with the Metamask Wallet](#415-Extending-the-application-with-the-Metamask-Wallet)
- #### [The development of an application for decentralised transactions](#5-The-development-of-an-application-for-decentralised-transactions)
    * #### [General conditions of the paper](#51-General-conditions-of-the-paper)
    * #### [Challenges during the development process](#52-Challenges-during-the-development-process)
- #### [Evaluative summary of the result](#6-Evaluative-summary-of-the-result)
- #### [List of Figures](#List-of-figures-1)
- #### [Bibliography](#Bibliography-1)

---

### 1 Introduction

<p style="text-align: justify">
In recent decades, the world has developed into a digital service society in which almost everything is done online.
Also Payments are mostly done on the Internet. This even happens when paying in retail stores with a credit or girocard.
In many places, it is common to pay with a smartphone or smartwatch.
</p>

<p style="text-align: justify">
In order to execute a payment, third party service providers are required. These service providers can be banks or
online payment services such as <I>PayPal</I> and <I>Sofortüberweisung</I>. In the case of payment by smartphone or
smartwatch, large companies like <I>Google</I> or <I>Apple</I> stand in between as intermediaries. The responsibility
for the transaction from one party to another is therefore transferred to a third party, which receives all the
information necessary or available to execute the transaction. This information contains not only data on the accounts
between which the money is to be transferred, but also of the persons to which the accounts can be assigned, and in some
cases, the purpose for which the transaction is to take place. In this way, the third-party knows who the holder of the
card or device is, in which supermarket he spends how much money and in some cases, what he has bought.
</p>

<p style="text-align: justify">
Consumers not only need to trust that service providers will execute transactions correctly, it must also be taken into
account that payment data will be shared, for example with advertisers or for credit rating. A completely anonymous way
of transferring money, as it is the case with analogue money, so cash, cannot be guaranteed with our current financial
system for immaterial transactions.
</p>

<p style="text-align: justify">
Decentralised cryptocurrencies offer a solution. Decentralised infrastructures allow transactions without a third party
and offer anonymity.
</p>

<p style="text-align: justify">
The basis of the present paper is the development of an application that makes it possible to get in touch with other
people, to network and communicate. The linked people can then use the application to make anonymous payments to each
other based on a cryptocurrency.
</p>

### 2 Initial position

#### 2.1 Cryptocurrencies

#### 2.1.1 Development of cryptocurrencies

<p style="text-align: justify">
As explained in [1], a cryptocurrency can be described as a digital currency secured by cryptography. It is intended to
be an independent, decentralised and secure alternative to our current payment system.
</p>

<p style="text-align: justify">
The first cryptocurrency eCash was developed in 1983 by the American cryptographer David Chaum. As he describes in [2],
eCash was supposed to make it possible to execute transactions between two parties digitally. The new cryptographic
technique "blind signatures" was to be used for this. The currency did not succeed; the company behind it, DigiCash, had
to file for bankruptcy in 1998.
</p>

<p style="text-align: justify">
The first cryptocurrency which achieved mainstream recognition was Bitcoin in 2009. It was developed during the
financial crisis of 2008 by the pseudonym Satoshi Nakamoto and, together with blockchain technology, it represents a
fundamental innovation in the development of cryptocurrencies. Based on Bitcoin, many new cryptocurrencies have
developed since 2008. According to [3], more than 4,500 cryptocurrencies are now listed on CoinMarketCap.
</p>

<p style="text-align: justify">
Among the many digital currencies is the cryptocurrency Ether. It is the currency on the decentralised platform
Ethereum.
</p>

#### 2.1.2 How transactions work in a blockchain

#### 2.1.3 Ethereum and Smart Contracts

#### 2.1.4 Potential and current purpose of cryptocurrencies

#### 2.2 Weaknesses of current transaction platforms

#### 2.3 Current state of research

#### 2.4 Decentralised transaction mechanisms as a solution approach

### 3 The development of an application for decentralised transactions

#### 3.1 Objectives and methodology

#### 3.1.1 Functions and purpose of the application

#### 3.1.2 Realisation

#### 3.2 Structure and functioning of the application

#### 3.2.1 Communication with the user - React.js

#### 3.2.2 Communication with Ethereum - Metamask

#### 3.2.3 Data storage and processing - Firebase

#### 3.3 Conventional and innovative elements of the application

#### 3.4 Outlook

#### 3.4.1 Decentralised data storage with IPFS

#### 3.4.2 ERC-20 token integration

#### 3.4.3 Group chats with smart contracts

### 4 Documentation

#### 4.1 Representation of the work process

#### 4.1.1 First planning and sketches

#### 4.1.2 Development of a first messenger application

#### 4.1.3 Extended planning

#### 4.1.4 Development of a private messenger application

#### 4.1.5 Extending the application with the Metamask Wallet

### 5 Critical reflection

#### 5.1 General conditions of the paper

#### 5.2 Challenges during the development process

### 6 Evaluative summary of the result

### List of figures

### Bibliography

[1] CoinMarketCap, „What Is a Cryptocurrency?”, 2021
<br>https://coinmarketcap.com/alexandria/glossary/cryptocurrency
<br>(last accessed 23.03.2021)

[2] Chaum, David, „Blind signatures for untraceable payments“, Boston SpringerVerlag 1983, pp. 199-203
<br>https://www.chaum.com/publications/Chaum-blind-signatures.PDF
<br>(last accessed 23.03.2021)

[3] CoinMarketCap, „Today's Cryptocurrency Prices by Market Cap“, 2021
<br>https://coinmarketcap.com/
<br>(last accessed 29.03.2021) 
