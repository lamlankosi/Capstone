<template>
  <div class="admin">
    <h1>Users Page</h1>

    <!-- Logged-in User -->
    <div v-if="user" class="logged-in-user">
      <div class="user-profile">
        <img :src="user.imageURL" :alt="user.firstName" class="profile-image" loading="lazy">
      </div>
      <div class="user-info">
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <p><strong>Gender:</strong> {{ user.gender }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <p><strong>Email:</strong> {{ user.emailAdd }}</p>
      </div>
    </div>

    <!-- Users List -->
    <div class="user-container">
      <div class="user-header">
        <h2>Users</h2>
        <input type="text" v-model="searchQueryuser" class="search-input" placeholder="Search users...">
        <button class="btn" @click="showAddUserModal = true">Add User</button>
      </div>
      <div class="users-table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Profile</th>
              <th>First Name</th>
              <th>Surname</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="searchUsers.length === 0">
              <td colspan="8" class="no-users">No users found</td>
            </tr>
            <tr v-else v-for="user in searchUsers" :key="user.userID">
              <td>{{ user.userID }}</td>
              <td><img :src="user.imageURL" :alt="user.firstName" class="user-image" loading="lazy"></td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.emailAdd }}</td>
              <td class="actions">
                <button @click="openEditModal(user)" class="edit-btn">✏️</button>
                <button @click="deleteUser(user.userID)" class="delete-btn">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    <AddUserModal :visible="showAddUserModal" @update:visible="showAddUserModal = $event" @add-user="handleAddUser" />
    <EditUserModal :visible="showEditUserModal" :user="selectedUser" @update:visible="showEditUserModal"/>
  </div>
</template>

<script>
import AddUserModal from '@/components/AddUserModal.vue'
import EditUserModal from '@/components/EditUserModal.vue'

export default {
  name: 'AdminView',
  components: { AddUserModal, EditUserModal },
  data() {
    return {
      searchQueryuser: '',
      showAddUserModal: false,
      showEditUserModal: false,
      selectedUser: null,
    }
  },
  computed: {
    users() {
      return this.$store.state.users || []
    },
    user() {
      return this.$store.state.user || null
    },
    searchUsers() {
      return this.users.filter(user => {
        const search = this.searchQueryuser.toLowerCase()
        return (
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search)
        )
      })
    }
  },
  methods: {
    handleAddUser(user) {
      this.$store.dispatch('registerUser', user);
    },
    async deleteUser(userID) {
      await this.$store.dispatch('deleteUser', userID)
    },
    openEditModal(user){
      this.selectedUser = user
      this.showEditUserModal = true
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchUsers')
    const userId = this.$store.state.user?.userId
    if (userId) {
      await this.$store.dispatch('fetchUser', userId)
    }
  }
}
</script>

<style scoped>
.admin {
  padding: 20px;
  max-width: 900px;
  margin: auto;
  color: #f5f5f5;
  background: #121212;
  border-radius: 10px;
}

h1, h2 {
  text-align: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #444;
  background: #1e1e1e;
  color: #f5f5f5;
}

.btn {
  padding: 10px;
  background: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}

.users-table-container {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background: #1e1e1e;
}

.user-image {
  max-width: 40px;
  border-radius: 50%;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.no-users {
  text-align: center;
  color: #888;
}

@media (max-width: 350px) {
  .admin {
    padding: 10px;
  }
  .search-input {
    width: 100%;
  }
  .users-table {
    font-size: 12px;
  }
}
</style>