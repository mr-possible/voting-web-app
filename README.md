# Secure System for Voting using Blockchain (CSM20 project)

Name - Sambhav Dave <br>
Student Id - 2267358 <br>

This is a voting dApp built using React (frontend) and Node (backend) with PostgresDB for storing voter information. Blockchain test network used is offered by Ganache. Used Metamask as wallet for doing transactions in a simulated environment of Ganache.

## Prerequisites

- Ensure you have following installed:
  - [Chrome Browser](https://www.google.com/chrome/)
  - [Node](https://nodejs.org/en/download/current) (version 21.2.0)
  - [Truffle](https://trufflesuite.com/docs/truffle/how-to/install/)

- If not, please install referring to links above.

## Overview and initial setup

- This project is hosted on private github repository (as of now) and cannot be accessed by `git clone` command. Hence to start with the setup of the project, please unzip the folder and place it in your desired location.

- Once done, open Microsoft VSCode. If you have not installed it yet, please [check here](https://code.visualstudio.com/download).

- Once installed/opened, import the folder inside the unzipped folder into VS code to setup your development environment.

- The whole project is divided into 2 parts - the `admin_service` and the `voter_service`.

- Apart from these two services, the truffle configuration file lies in the root location of the project with the file name as `truffle-config.js`

## Setting up Ganache and Metamask

- First install [Ganache](https://trufflesuite.com/ganache/) and [Metamask](https://metamask.io/download/) chrome extension.

- Setup Ganache workspace giving any name that you like.

- Once the workspace is established, go to settings -> Server -> HOSTNAME.

- Please select `0.0.0.0` so that there will not be any issue regarding the domain of operation in the machine getting used.

- Ensure port number is `7545`.

- Come to metamask and import a few accounts, only one being for the admin and rest being for the voters (this is up to you).

## Compiling and Deploying the Smart Contract

- There is only one smart contract called as `Election.sol` in this project located in the root location under `contracts` folder.

- In any dApp, first-time setup requires compilation and deployment of the smart contract to the test network (which is Ganache in our case).
  - To compile, run the command: `truffle compile`
  - To deploy, run the command: `truffle migrate`

- If no errors occur, go to Ganache and click on <b>Contracts</b> icon, to check the smart contract is deployed or not. You should be able to see the same.

## Setting up database

- Install [PostgreSQL](https://www.postgresql.org/download/). [This video for Microsoft Windows](https://www.youtube.com/watch?v=IYHx0ovvxPs) can help.

- Once installed, please keep a note of the `username` and `password` that you setup it with as both will be used in making the connection to the database.

- Make a database named as `voting_webapp` with a voter table having columns as in `table.sql` in the root location of this project. Please use this in order to create the table with correct column names.

## Setting up the Admin Service

- The admin service is operating from the folder `admin_service` which is having its own frontend and backend.

- In the terminal, run `cd admin_service` and run the command `npm install`. This will generate `package-lock.json` consisting of all the dependencies that are used.

- Once it is completed, copy the contents of `.example.env` and make a new file `.env` in the same location.

- Paste the contents into `.env` file and enter the information according your configuration. Comments that are there should help.

- For setting up the frontend, in a new terminal run `cd admin_service/frontend` and run `npm install` again. This will make the frontend ready.

## Setting up the Voter Service

- The voter service is operating from the folder `voter_service` which is having its own frontend and backend.

- In the terminal, run `cd voter_service/backend` and run the command `npm install`. This will generate `package-lock.json` consisting of all the dependencies that are used in the backend. 

- Once it is completed, copy the contents of `.example.env` and make a new file `.env` in the same location.

- Paste the contents into `.env` file and enter the information according your configuration. Comments that are there should help.

- For setting up the frontend, in a new terminal run `cd voter_service/frontend` and run `npm install` again. This will make the frontend ready.

## Usage

- By now, you should have ideally openend four terminals each for admin_service (backend), admin_service (frontend), voter_service (backend) and voter_service (frontend). If not, kindly do so.

- In each one of them, do `npm start`. If any prompt comes saying there is already a port occupied or somethng, just press `y` on the keyboard.

- Happy voting!
