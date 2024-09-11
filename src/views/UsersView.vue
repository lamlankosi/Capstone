<template>
    <div class="admin">
        <h1>Users Page</h1>

        <!-- user -->
        <div v-if="user" class="logged-in-user">
            <div class="user-profile">
                <img :src="user.profileURL" :alt="user.firstName" class="profile-image" loading="lazy">
            </div>
            <div class="user-info">
                <h2 class="fw-bold">{{ user.firstName }} {{ user.lastName }}</h2>
                <p><span class="fw-bold">Age:</span> {{ user.age }}</p>
                <p><span class="fw-bold">Gender:</span> {{ user.gender }}</p>
                <p><span class="fw-bold">Role:</span>{{ user.role }}</p>
                <p><span class="fw-bold">Email:</span> {{ user.emailAdd }}</p>
            </div>
        </div>

        <!-- users -->

        <div v-if="users.length" class="user-container">
            <div class="user-title">
                <h2>Users</h2>
                <div class="col-md-3">
                    <h5 class="search">Search Users</h5>
                    <input type="text" v-model="searchQueryuser" class="form-control"
                        placeholder="Search by first Name or Surname">
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary" @click="showAddUserModal = true">
                        Add User
                    </button>
                </div>
            </div>
            <div class="products-table">
                <table>
                    <tr>
                        <th>User ID</th>
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>Email Address</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                    <tr v-if="searchUsers.length === 0">
                        <td colspan="7" class="no-products">User not on database</td>
                    </tr>
                    <tr v-else v-for="user in searchUsers" :key="user.userID">
                        <td>{{ user.userID }}</td>
                        <td><img :src="user.imageURL" :alt="user.firstName" class="product-image" loading="lazy"></td>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.gender }}</td>
                        <td>{{ user.role }}</td>
                        <td>{{ user.emailAdd }}</td>
                        <td>{{ user.password }}</td>
                        <td class="actions">

                            <button @click="editUser(user)"><i class="bi bi-pencil"></i></button>
                            <button @click="deleteUser(user.userID)"><i class="bi bi-trash-fill"></i></button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <AddUserModal :visible="showAddUserModal" @update:visible="showAddUserModal = $event"
            @add-user="handleAddUser" />
    </div>


</template>

<script>
import AddUserModal from '@/components/AddUserModal.vue';
export default {
    name: 'AdminView',
    components: {
        AddUserModal
    },
    data() {
        return {
            searchQueryuser: '',
            showAddUserModal: false,
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
button {
    background: black;
    border-radius: 10px;
}

table {
    /* width: 100%;
    margin-top: 20px; */
    border-collapse: collapse;
}

th,
td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f4f4f4;
}

td img {
    max-width: 50px;
 
}

.actions i {
    margin: 0 5px;
    cursor: pointer;
}
</style>