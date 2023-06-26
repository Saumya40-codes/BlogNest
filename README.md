# BlogNest

BlogNest is a full-stack web application built using React, Node.js, and MySQL. It is a powerful and intuitive blogging platform that allows users to create, read, and share blog posts. The application also includes features such as Firebase authentication, reading modes, liking comments, and a search functionality to easily navigate through the blogs.

## Getting Started

To get started with BlogNest, follow the instructions below:

### Prerequisites

- Node.js installed on your local machine
- MySQL database setup

### Installation

1. Clone the repository to your local machine:

   ```shell
   git clone <repository-url>

2. Redirect to project directory
   ### `cd blognest`

3. Install Dependencies
   ###  `npm install`

4. Setup MYSQL database

   I personally did this on MYSQL Workbench
   use the following command in MYSQL workbench after making a database init named 'crudreact'
   ### `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '#your MySQL password'; `
   ###  `flush privileges;`

5. three tables till now
   
   (1) ![image](https://github.com/Saumya40-codes/BlogNest/assets/115284013/c24afb75-24cc-42b9-8885-46a219309d1e)   (Name: blogs) <br />
   (2) ![image](https://github.com/Saumya40-codes/BlogNest/assets/115284013/af24d86c-9485-4de7-b2e8-dfb17f65074f)   (Name: comments) <br />
   (3) ![image](https://github.com/Saumya40-codes/BlogNest/assets/115284013/8f33ef12-cf47-41f8-a63a-d7cef608328e)   (Name: notifs)  <br />

   Dont forget to change mysql configuration in server/index.js (You might only need to change password in it)

6. run the backend
   ### `cd server`
   ### `npm run devStart`

7. run frontend
   ### `npm start`
   


## Features
Firebase Authentication: Users can sign up and log in to BlogNest using their Firebase accounts, ensuring secure access to the platform.

Write Blog: Authenticated users can create and publish their own blog posts using an intuitive and user-friendly interface.

Read Blog: Users can browse through a collection of blog posts, view the details of each post, and read the content in a clean and visually appealing layout.

Reading Modes: BlogNest offers different reading modes, such as light mode and dark mode, allowing users to customize their reading experience.

Liking Comments: Users can like and interact with blog posts, promoting engagement and community interaction.

Sharing of Blogs: Users can easily share their favorite blog posts with others by generating shareable links or through social media integration.

Search Through Blogs: BlogNest provides functionality allowing users to search for specific blogs or topics of interest, enabling efficient navigation through the platform.
   
