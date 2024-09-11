<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <h3>Add New Order</h3>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="prodID">ProdID</label>
                    <input v-model="newOrder.prodID" type="text" id="prodID" required>
                </div>
                <div class="form-group">
                    <label for="userID">User ID</label>
                    <input v-model="newOrder.userID" type="text" id="userID" required>
                </div>
                <div class="form-group">
                    <label for="status">Status</label>
                    <input v-model="newOrder.status" type="text" id="status" required>
                </div>
                <button type="submit" class="btn btn-primary">Add Order</button>
                <button type="button" @click="$emit('update:visible', false)" class="btn btn-secondary">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            newOrder: {
                userID: '',
                totalAmount: 0,
                status: 'pending',
                prodID:''
}
        };
    },
    methods: {
        submitForm() {
            this.$emit('add-order', this.newOrder);
            this.$emit('update:visible', false);
        }
    }
}
</script>

<style scoped>
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

.modal-content {
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
</style>