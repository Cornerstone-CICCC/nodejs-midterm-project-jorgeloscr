// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
//     <meta name="viewport" content="width=device-width" />
//     <meta name="generator" content={Astro.generator} />
//     <title>Astro</title>
//     <style>
//       .hidden {
//         display: none;
//       }

//       body {
//         font-family: "Arial", sans-serif;
//         background-color: #f4f4f9;
//         margin: 0;
//         padding: 0;
//       }

//       .container {
//         max-width: 900px;
//         margin: 2rem auto;
//         padding: 1rem;
//         background-color: #fff;
//         border-radius: 8px;
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         display: flex;
//         flex-direction: column;
//         gap: 1.5rem;
//       }

//       .profile-title {
//         font-size: 2rem;
//         color: #333;
//         margin-bottom: 0.5rem;
//       }

//       .logout-btn {
//         align-self: flex-end;
//         padding: 0.5rem 1rem;
//         background-color: #f44336;
//         color: white;
//         border: none;
//         border-radius: 5px;
//         cursor: pointer;
//       }

//       .logout-btn:hover {
//         background-color: #d32f2f;
//       }

//       .add-article {
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//       }

//       .input-title,
//       .input-content,
//       .select-status,
//       .submit-btn {
//         padding: 0.75rem;
//         border: 1px solid #ccc;
//         border-radius: 5px;
//         font-size: 1rem;
//       }

//       .input-title,
//       .input-content {
//         width: 100%;
//       }

//       .input-content {
//         height: 150px;
//       }

//       .select-status {
//         width: auto;
//       }

//       .submit-btn {
//         background-color: #4caf50;
//         color: white;
//         border: none;
//         cursor: pointer;
//       }

//       .submit-btn:hover {
//         background-color: #388e3c;
//       }

//       .todo-table {
//         width: 100%;
//         border-collapse: collapse;
//       }

//       .table-header {
//         background-color: #f1f1f1;
//         padding: 0.8rem;
//         text-align: left;
//         color: #333;
//       }

//       tbody tr {
//         border-bottom: 1px solid #ddd;
//       }

//       tbody tr:hover {
//         background-color: #fafafa;
//       }

//       /* Modal Styling */
//       .modal {
//         display: none;
//         position: fixed;
//         z-index: 1;
//         left: 0;
//         top: 0;
//         width: 100%;
//         height: 100%;
//         overflow: auto;
//         background-color: rgba(0, 0, 0, 0.4);
//         padding-top: 60px;
//       }

//       .modal-content {
//         background-color: #fff;
//         margin: auto;
//         padding: 20px;
//         border-radius: 10px;
//         width: 80%;
//         max-width: 500px;
//       }

//       .modal-content input,
//       .modal-content textarea,
//       .modal-content select,
//       .modal-content button {
//         width: 100%;
//         margin: 10px 0;
//         padding: 10px;
//         font-size: 1rem;
//       }

//       .modal-header {
//         font-size: 1.5rem;
//         font-weight: bold;
//         margin-bottom: 15px;
//       }

//       .close {
//         color: #aaa;
//         font-size: 28px;
//         font-weight: bold;
//         position: absolute;
//         right: 20px;
//         top: 10px;
//       }

//       .close:hover,
//       .close:focus {
//         color: black;
//         text-decoration: none;
//         cursor: pointer;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container hidden">
//       <h1 class="profile-title">My Profile</h1>
//       <button class="logout-btn">Log Out</button>

//       <form class="add-article">
//         <input
//           type="text"
//           name="title"
//           class="input-title"
//           autocomplete="off"
//           placeholder="Enter title"
//         />
//         <textarea
//           name="content"
//           id="content"
//           class="input-content"
//           placeholder="Enter content"></textarea>
//         <select id="status" class="select-status">
//           <option value="completed">Completed</option>
//           <option value="notCompleted">Not Completed</option>
//         </select>
//         <button type="submit" class="submit-btn">Create Article</button>
//       </form>

//       <table class="todo-table">
//         <thead>
//           <tr>
//             <th class="table-header">Title</th>
//             <th class="table-header">Content</th>
//             <th class="table-header">Status</th>
//             <th class="table-header">Actions</th>
//           </tr>
//         </thead>
//         <tbody class="tbody-articles">
//           <!-- ARTICLES SHOW UP HERE -->
//         </tbody>
//       </table>
//     </div>

//     <!-- Modal for Update -->
//     <div id="updateModal" class="modal">
//       <div class="modal-content">
//         <span class="close">&times;</span>
//         <h2 class="modal-header">Update Article</h2>
//         <form id="updateForm">
//           <input type="text" id="modalTitle" name="title" placeholder="Enter title" required />
//           <textarea id="modalContent" name="content" placeholder="Enter content" required></textarea>
//           <select id="modalStatus" name="status">
//             <option value="completed">Completed</option>
//             <option value="notCompleted">Not Completed</option>
//           </select>
//           <button type="submit" class="submit-btn">Update</button>
//           <button type="button" class="submit-btn cancel-btn">Cancel</button>
//         </form>
//       </div>
//     </div>

//     <script>
//       const container = document.querySelector(".container");
//       const logoutBtn = container.querySelector(".logout-btn");
//       const articleForm = container.querySelector(".add-article");
//       const tableBody = container.querySelector(".tbody-articles");

//       // Modal elements
//       const modal = document.getElementById("updateModal");
//       const closeModalBtn = modal.querySelector(".close");
//       const updateForm = document.getElementById("updateForm");
//       const cancelBtn = modal.querySelector(".cancel-btn");

//       // Close modal on clicking 'X'
//       closeModalBtn.onclick = () => {
//         modal.style.display = "none";
//       };

//       // Close modal on clicking 'Cancel'
//       cancelBtn.onclick = () => {
//         modal.style.display = "none";
//       };

//       window.onclick = (event) => {
//         if (event.target === modal) {
//           modal.style.display = "none";
//         }
//       };

//       logoutBtn.addEventListener("click", async () => {
//         await fetch("http://localhost:3000/users/logout", {
//           credentials: "include",
//         });
//         window.location.href = "/";
//       });

//       const fetchArticles = async () => {
//         const res = await fetch("http://localhost:3000/articles", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         return data;
//       };

//       const buildList = async () => {
//         const articles = await fetchArticles();
//         tableBody.innerHTML = "";

//         let tableContent = "";
//         articles.forEach((article) => {
//           tableContent += `
//             <tr>
//               <td>${article.title}</td>
//               <td>${article.content}</td>
//               <td>${article.published ? "Completed" : "Not Completed"}</td>
//               <td>
//                 <button class="btnUpdate" data-id="${article.id}">Update</button>
//                 <button class="btnDelete" data-id="${article.id}">Delete</button>
//               </td>
//             </tr>
//           `;
//         });
//         tableBody.innerHTML = tableContent;

//         // Add event listeners for Update buttons
//         document.querySelectorAll(".btnUpdate").forEach((button) => {
//           button.addEventListener("click", async (e) => {
//             const articleId = button.getAttribute("data-id");
//             const res = await fetch(`http://localhost:3000/articles/${articleId}`, {
//               credentials: "include",
//             });
//             const article = await res.json();

//             // Pre-fill modal fields
//             document.getElementById("modalTitle").value = article.title;
//             document.getElementById("modalContent").value = article.content;
//             document.getElementById("modalStatus").value = article.published ? "completed" : "notCompleted";

//             // Open modal
//             modal.style.display = "block";

//             updateForm.onsubmit = async (event) => {
//               event.preventDefault();

//               const updatedData = {
//                 title: document.getElementById("modalTitle").value,
//                 content: document.getElementById("modalContent").value,
//                 published: document.getElementById("modalStatus").value === "completed",
//               };

//               await fetch(`http://localhost:3000/articles/update/${articleId}`, {
//                 method: "PUT",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//                 body: JSON.stringify(updatedData),
//               });

//               modal.style.display = "none";
//               buildList(); // Rebuild the list of articles
//             };
//           });
//         });

//         // Add event listeners for Delete buttons
//         document.querySelectorAll(".btnDelete").forEach((button) => {
//           button.addEventListener("click", async (e) => {
//             const articleId = button.getAttribute("data-id");

//             await fetch(`http://localhost:3000/articles/delete/${articleId}`, {
//               method: "DELETE",
//               credentials: "include",
//             });

//             buildList(); // Rebuild the list of articles after deletion
//           });
//         });
//       };

//       articleForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const formData = new FormData(articleForm);
//         const isChecked = formData.get("completed") === "on" ? true : false;

//         await fetch("http://localhost:3000/articles/add", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             title: formData.get("title"),
//             content: formData.get("content"),
//             published: isChecked,
//           }),
//         });

//         buildList();
//       });

//       const loadProfile = async () => {
//         const res = await fetch("http://localhost:3000/users/profile", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (res.ok) {
//           container.classList.remove("hidden");
//           const title = container.querySelector("h1");
//           title.innerText = `${data.username.toUpperCase()}'s Profile`;
//           buildList();
//         } else {
//           window.location.href = "/";
//         }
//       };

//       loadProfile();
//     </script>
//   </body>
// </html>