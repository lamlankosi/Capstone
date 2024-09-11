<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <h2>Edit User</h2>
            <form @submit.prevent="updateUser">
                <div class="form-group">
                    <label for="firstName">firstName</label>
                    <input type="text" id="firstName" v-model="form.firstName" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="lastName">lastName</label>
                    <input type="text" id="lastName" v-model="form.lastName" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="gender">gender</label>
                    <input type="text" id="gender" v-model="form.gender" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="role">role</label>
                    <input type="text" id="role" v-model="form.role" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="emailAdd">emailAdd</label>
                    <input type="text" id="emailAdd" v-model="form.emailAdd" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="password">Image URL</label>
                    <input type="text" id="password" v-model="form.password" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="imageURL">Image URL</label>
                    <input type="text" id="imageURL" v-model="form.imageURL" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary">Update user</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
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
            this.$store.dispatch('updateUser', { ...this.form })
            this.closeModal()
        },
        closeModal() {
            this.$emit('update:visible', false);
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    position: absolute;
    width: 300px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgb(68, 255, 0);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    margin-bottom: 15px;
}
</style>