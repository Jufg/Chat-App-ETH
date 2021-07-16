*Work in Progress !*

# Etheruem Chat-App - Documentation

The original paper in German is available [here](https://ipfs.io/ipfs/QmfSWG5eb9C7S8cWxfSkTarMva7xyn92qzgGRoTTJtL64y).

## Abstract

The world has become a globalised service society in recent years, with payments increasingly being made online by third
parties such as banks and other service providers. Users need to trust that this third party will execute transactions
correctly and that data will be managed correctly so that it is not accessible to the public. Cryptocurrencies offer a
fully decentralised way of executing and storing transactions using blockchain technology, so that there is no need to
trust any third party. With the Ethereum network, it is also possible to program applications on the blockchain. The
following application is designed to provide a decentralised and anonymous way of chatting and sending money to friends
using the [Ethereum](https://ethereum.org/) network and the browser extension [Metamask](https://metamask.io/).

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
    * #### [Representation of the work process](#41-Representation-of-the-work-process)
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

In recent decades, the world has developed into a digital service society in which almost everything is done online.
Also Payments are mostly done on the Internet. This even happens when paying in retail stores with a credit or girocard.
In many places, it is common to pay with a smartphone or smartwatch.

In order to execute a payment, third party service providers are required. These service providers can be banks or
online payment services such as *PayPal* and *Sofortüberweisung*. In the case of payment by smartphone or smartwatch,
large companies like *Google* or *Apple* stand in between as intermediaries. The responsibility for the transaction from
one party to another is therefore transferred to a third party, which receives all the information necessary or
available to execute the transaction. This information contains not only data on the accounts between which the money is
to be transferred, but also of the persons to which the accounts can be assigned, and in some cases, the purpose for
which the transaction is to take place. In this way, the third-party knows who the holder of the card or device is, in
which supermarket he spends how much money and in some cases, what he has bought.

Consumers not only need to trust that service providers will execute transactions correctly, it must also be taken into
account that payment data will be shared, for example with advertisers or for credit rating. A completely anonymous way
of transferring money, as it is the case with analogue money, so cash, cannot be guaranteed with our current financial
system for immaterial transactions.

Decentralised cryptocurrencies offer a solution. Decentralised infrastructures allow transactions without a third party
and offer anonymity.

The basis of the present paper is the development of an application that makes it possible to get in touch with other
people, to network and communicate. The linked people can then use the application to make anonymous payments to each
other based on a cryptocurrency.

### 2 Initial position

#### 2.1 Cryptocurrencies

#### 2.1.1 Development of cryptocurrencies

As explained in [[1]](#Bibliography-1), a cryptocurrency can be described as a digital currency secured by cryptography.
It is intended to be an independent, decentralised and secure alternative to our current payment system.

The first cryptocurrency eCash was developed in 1983 by the American cryptographer David Chaum. As he describes
in [[2]](#Bibliography-1), eCash was supposed to make it possible to execute transactions between two parties digitally.
The new cryptographic technique "blind signatures" was to be used for this. The currency did not succeed; the company
behind it, DigiCash, had to file for bankruptcy in 1998.

The first cryptocurrency which achieved mainstream recognition was Bitcoin in 2009. It was developed during the
financial crisis of 2008 by the pseudonym Satoshi Nakamoto and, together with blockchain technology, it represents a
fundamental innovation in the development of cryptocurrencies. Based on Bitcoin, many new cryptocurrencies have
developed since 2008. According to [[3]](#Bibliography-1), more than 4,500 cryptocurrencies are now listed on
CoinMarketCap.

Among the many digital currencies is the cryptocurrency Ether. It is the currency on the decentralised platform
Ethereum.

#### 2.1.2 How transactions work in a blockchain

As described in [[1]](#Bibliography-1), a blockchain is to be understood as a decentralised, cryptographically secured "
directory" of all transactions made in the network. This directory is called "ledger". The unique aspect is that the
transactions stored in the blockchain can be viewed publicly by anyone, but they cannot be assigned to a person. This
means that the Bitcoin network, for example, is anonymous.

In order for a user to be able to execute a Bitcoin transaction, he needs a cryptographically generated key pair. This
consists of the "Public Key" and the "Private Key". Both keys consist of a sequence of numbers and letters. The public
key is public and can be seen by anyone, while the private key is private and only known by the owner. From the private
key several associated public keys can be generated, so that one account can have several different addresses.

[<img src="https://ipfs.io/ipfs/QmRUkU87phupg8Hou1446GpFpjgfWvKEmJGKw9x6KVYrao" alt="Figure 1: Transactions in the Bitcoin network [4]." width="750"/>](https://ipfs.io/ipfs/QmRUkU87phupg8Hou1446GpFpjgfWvKEmJGKw9x6KVYrao)

*Figure 1: Transactions in the Bitcoin network [[4]](#Bibliography-1).*

The public key is the address of a Bitcoin account, the so called "wallet ", to which bitcoins can be sent. The private
key and the transaction data can then be used to create a cryptographic signature. The transaction data, the signature
and the public key can then be used to verify whether the signature actually belongs to the private key. In this way, a
transaction can be signed and verified without the private key having to be publicly known, because only the signature
is sent to the network. Each transaction receives a hash value (cf. Figure 1). A hash value is a unique value that is
formed using the hash function "SHA-256". A cryptographic hash function always returns the same unique value for the
same input. The input cannot be restored from the value [[5]](#Bibliography-1). A cryptographic hash value can therefore
be understood as a fingerprint of data. Each signature is therefore unique, even though the same transaction is
executed. The signature can be compared with physical signatures. But the signatures on the Bitcoin network are more
unique and secure. [[4]](#Bibliography-1)

[<img src="https://ipfs.io/ipfs/QmPMPYZV8yfBhoAq1YN8PKF1GxpiJMuwJ8qNYWsdkF57Ym" alt="Figure 2: The Bitcoin Blockchain [4]." width="750"/>](https://ipfs.io/ipfs/QmRUkU87phupg8Hou1446GpFpjgfWvKEmJGKw9x6KVYrao)

*Figure 2: The Bitcoin Blockchain [[4]](#Bibliography-1).*

Once a transaction has been signed with the private key and verified with an associated public key, the transactions are
stored in a block. This block is attached to the blockchain. Thereby, the blockchain represents a simple chained list in
which each block points to the following block in which the successor contains the hash of the predecessor (cf. figure
2).

In order for a block to be verified on the network, a certain number must be found so that the hash of the block starts
with a certain number of zeros. This number is called "nonce" and is also stored in the block. To find the nonce, every
possible combination of numbers is tried until the hash value starts with a certain number of zeros. The one, who finds
the nonce receives the "block reward" and the transaction fees that the user can provide so that his transaction is
preferentially executed. In order to keep the amount of bitcoins limited at 21 million, the block rewards are halved
every 210,000 blocks. This process is called "halving". Satoshi Nakamoto describes finding a nonce as
proof-of-work [[4]](#Bibliography-1), as this process uses physical computing power to check a block. Because new
Bitcoins are created here, this process is called "mining". This is to guarantee security in the network. The number of
zeros is then indicated by the so called "Difficulty", which results from the computing power in the network. Because
the higher the Difficulty, more zeros must be placed at the beginning of the hash value, and with each additional zero,
the work required to find the nonce grows exponentially. To create an interest in finding the nonce of a block, the
person who finds the nonce receives a reward in the form of Bitcoin. The Difficulty is adjusted in the Bitcoin network
in such a way that, with the appropriate computing power, it takes about 10 minutes to find the nonce and verify the
block and the transactions it contains. [[4]](#Bibliography-1)

The individual transactions are stored in a so called "Merkle Tree". A Merkle Tree can be understood like a binary tree,
except that in the Merkle Tree the root is generated from the leaves of the tree (cf. Figure 3). For this purpose, the
hash values of the transactions are stored in the leaves. From two leaves the node above it is created. It contains a
hash value that is formed from the two leaves. In the end, only the root of the tree remains. This hash value is also
called "root hash" and is stored in the block.

[<img src="https://ipfs.io/ipfs/QmTN2vABMDnUfrRQuJQEqDWziSzAV6NiDTLjjL5NxqutCv" alt="Figure 3: Merkle Tree in Bitcoin [6]." width="750"/>](https://ipfs.io/ipfs/QmTN2vABMDnUfrRQuJQEqDWziSzAV6NiDTLjjL5NxqutCv)

*Figure 3: Merkle Tree in Bitcoin [[6]](#Bibliography-1).*

Because a hash value is unique and differs significantly from its predecessor with only a small change in the input, the
change in a transaction is reflected directly in the root hash. This change changes the hash value of an entire block
and therefore the hash value of all following blocks. Therefore, the nonce of the following blocks is no longer valid,
and a new nonce would have to be found for all following blocks. It is then impossible to later change transactions in
the blockchain. According to Buterin [[6]](#Bibliography-1), this type of data structure of the blockchain results in
great scalability, as only the hash value is stored and therefore many transactions can be stored securely and with
little effort. [[4]](#Bibliography-1)

In order for a consensus to emerge on a currency, there are the so called "nodes". They store the entire blockchain and
search for new transactions to store in a new block. The node checks whether the transactions are valid and tries to
find the matching nonce for the block. Once the nonce is found, the block is appended to the blockchain and communicated
to all other nodes in the network. These then check whether the nonce is correct, i.e. whether there are enough zeros at
the beginning of the hash value to match the difficulty. The nodes at the same time search for many other blockchains in
the network. Only the blockchain with the most blocks is accepted. An added block is only accepted if it is still
present in the blockchain after a long time, i.e. if it has been accepted by a particularly large number of nodes. This
makes the blockchain particularly secure and decentralised. Because in order to forge a transaction, it would be
necessary to have at least 51% of the computing power in the network to validate the other blocks with a nonce faster
than the rest of the network it does over a longer period of time - a so-called 51% attack [[7]](#Bibliography-1).
Running a node is possible for any user without much hardware effort (as long as the user doesn't want to mine) and
allows him to contribute to the security of the network. [[4]](#Bibliography-1)

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

[1] *CoinMarketCap*, "What Is a Cryptocurrency?", 2021
<br>https://coinmarketcap.com/alexandria/glossary/cryptocurrency
<br>(last accessed 23.03.2021)

[2] *Chaum, David*, "Blind signatures for untraceable payments", Boston SpringerVerlag 1983, pp. 199-203
<br>https://www.chaum.com/publications/Chaum-blind-signatures.PDF
<br>(last accessed 23.03.2021)

[3] *CoinMarketCap*, "Today's Cryptocurrency Prices by Market Cap", 2021
<br>https://coinmarketcap.com/
<br>(last accessed 29.03.2021)

[4] *Nakamoto, Satoshi*, "Bitcoin: A Peer-to-Peer Electronic Cash System", 2008
<br>https://bitcoin.org/bitcoin.pdf
<br>(last accessed 29.03.2021)

[5] *CoinMarketCap*, "What Is a Cryptographic Hash Function?", 2021
<br>https://coinmarketcap.com/alexandria/glossary/cryptographic-hash-function
<br>(last accessed 31.03.2021)

[6] *Buterin, Vitalik*, "A Next-Generation Smart Contract and Decentralized Application Platform", 2013
<br>https://ethereum.org/de/whitepaper/
<br>(last accessed 29.03.2021)

[7] *Beigel, Ofir*, "51% Attack Explained – a Beginner’s Guide", 99Bitcoins 2020
<br>https://99bitcoins.com/51-percent-attack/
<br>(last accessed 30.03.2021)
