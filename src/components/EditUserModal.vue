<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">
                <i class="bi bi-x-circle-fill"></i>
            </button>
            <h2>Edit User</h2>
            <form @submit.prevent="updateUser">
                <div class="form-container">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" v-model="form.firstName" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" v-model="form.lastName" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <input type="text" id="gender" v-model="form.gender" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="role">Role</label>
                        <input type="text" id="role" v-model="form.role" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="emailAdd">Email</label>
                        <input type="email" id="emailAdd" v-model="form.emailAdd" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="form.password" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="imageURL">Image URL</label>
                        <input type="text" id="imageURL" v-model="form.imageURL" class="form-control" required />
                    </div>
                </div>
                <button type="submit" class="btn-primary">Update User</button>
                <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditUserModal',
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                gender: '',
                role: '',
                emailAdd: '',
                password: '',
                imageURL: '',
            }
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(newUser) {
                if (newUser) {
                    this.form = { ...newUser };
                }
            }
        }
    },
    methods: {
        updateUser() {
            const data = {
                id: this.form.userID,
                cred: {
                    firstName: this.form.firstName,
                    lastName: this.form.lastName,
                    gender: this.form.gender,
                    role: this.form.role,
                    emailAdd: this.form.emailAdd,
                    password: this.form.password,
                    imageURL: this.form.imageURL,
                }
            }
            console.log(data.cred);
            
            this.$store.dispatch('updateUser', data)
            this.closeModal()
        },
        closeModal() {
            this.$emit('update:visible', false); // Emit the event to update the visible prop
        }
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(18, 18, 18, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}

.modal-content {
    padding: 20px;
    border-radius: 12px;
    width: 90%;
    max-width: 420px;
    background-color: #1e1e1e;
    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 14px;
    color: #e0e0e0;
    position: relative;
    max-height: 80vh;
    overflow-y: auto;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 22px;
    color: #e0e0e0;
    cursor: pointer;
}

.close-button:hover {
    color: #48bb78;
}

h2 {
    text-align: center;
    color: #48bb78;
}

.form-container {
    max-height: 60vh;
    overflow-y: auto;
}

.form-group {
    margin-bottom: 14px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #b0b0b0;
    font-size: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #7a7a7a;
    border-radius: 8px;
    font-size: 15px;
    background: rgba(255, 255, 255, 0.1);
    color: #f5f5f5;
}

.form-control::placeholder {
    color: #b0b0b0;
}

.btn-primary {
    background-color: #48bb78;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
}

.btn-primary:hover {
    background-color: #38a169;
}

.btn-secondary {
    background-color: #7a7a7a;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
    margin-top: 12px;
}

.btn-secondary:hover {
    background-color: #5a5a5a;
}
</style>