function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : {};
}

function saveUser(username, password) {
  const users = getUsers();
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
}

function irParaCadastro() {
  window.location.href = "cadastro.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const users = getUsers();

      if (users[username] && users[username] === password) {
        window.location.href = "inicial.html"; 
      } else {
        document.getElementById("message").textContent = "Usuário ou senha incorretos.";
      }
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const newUsername = document.getElementById("newUsername").value;
      const newPassword = document.getElementById("newPassword").value;
      const users = getUsers();

      if (users[newUsername]) {
        document.getElementById("message").textContent = "Usuário já existe.";
      } else {
        saveUser(newUsername, newPassword);
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const usernameInput = document.getElementById('username');
    const commentTextInput = document.getElementById('comment-text');
    
    // Load comments from localStorage
    loadComments();
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const commentText = commentTextInput.value.trim();
        
        if (username && commentText) {
            addComment(username, commentText);
            
            // Clear form
            usernameInput.value = '';
            commentTextInput.value = '';
        }
    });
    
    function addComment(username, text) {
        // Create comment object
        const comment = {
            id: Date.now(),
            username: username,
            text: text,
            date: new Date().toISOString()
        };
        
        // Save to localStorage
        saveComment(comment);
        
        // Create comment element
        createCommentElement(comment);
    }
    
    function createCommentElement(comment) {
        // Remove "no comments" message if it exists
        const noComments = commentsList.querySelector('.no-comments');
        if (noComments) {
            noComments.remove();
        }
        
        // Create comment item
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.dataset.id = comment.id;
        
        const commentAuthor = document.createElement('div');
        commentAuthor.className = 'comment-author';
        commentAuthor.textContent = comment.username;
        
        const commentText = document.createElement('div');
        commentText.className = 'comment-text';
        commentText.textContent = comment.text;
        
        commentItem.appendChild(commentAuthor);
        commentItem.appendChild(commentText);
        
        // Add to list
        commentsList.appendChild(commentItem);
    }
    
    function saveComment(comment) {
        let comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }
    
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        
        if (comments.length > 0) {
            // Clear "no comments" message
            commentsList.innerHTML = '';
            
            // Add each comment to the list
            comments.forEach(comment => {
                createCommentElement(comment);
            });
        }
    }
});
