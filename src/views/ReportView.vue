<template>
  <div class="contact-us-container">
    <div class="content">
     <h2>Contact us</h2>
      <p>Contact us at the form on right if you having issues... And tell us wich issues you are having</p>
    </div>
    <div class="form-container">
      <form
        action="https://formspree.io/f/xblrwvkb"
        method="POST"
      >
        <div class="form-group">
          <label for="first-name">First name</label>
          <input type="text" id="first-name" name="first-name" required>
        </div>
        <div class="form-group">
          <label for="last-name">Last name</label>
          <input type="text" id="last-name" name="last-name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">What can we help you with?</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.contact-us-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 50px;
  padding-left: 220px;
  background-color: #f8f9fa;
}

.content {
  flex: 1;
  padding-right: 50px;
}

h2 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #6c757d;
}


.form-container {
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  height: 100px;
  resize: none;
}

.submit-btn {
  background-color: #5a67d8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #4c51bf;
}

@media (max-width: 768px) {
  .contact-us-container {
    flex-direction: column;
    padding-left: 20px; 
  }

  .content {
    padding-right: 0;
    margin-bottom: 20px;
  }
}
</style>
