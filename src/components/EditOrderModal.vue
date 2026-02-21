<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">&times;</button>
            <h2>Edit Order</h2>
            <form @submit.prevent="updateOrderDetails">
                <div class="form-group">
                    <label for="status">Status</label>
                    <input type="text" id="status" v-model="form.status" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="totalAmount">Total Amount</label>
                    <input type="number" id="totalAmount" v-model="form.totalAmount" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="Location">Date & Time</label>
                    <input type="datetime-local" id="Location" v-model="form.orderDate" class="form-control" />
                </div>
                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Update Order</button>
                    <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditOrderModal',
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        order: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            form: {
                orderID: 0,
                status: '',
                orderDate: '',
                totalAmount: '',
            }
        }
    },
    watch: {
        order: {
            immediate: true,
            handler(newOrder) {
                if (newOrder) {
                    this.form = { ...newOrder };
                }
            }
        }
    },
    methods: {
        updateOrderDetails() {
            const data = {
                id: this.form.orderID,
                cred: {
                    status: this.form.status,
                    orderDate: this.form.orderDate,
                    totalAmount: this.form.totalAmount,
                }
            };
            this.$store.dispatch('updateOrder', data);
            this.closeModal();
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
    background-color: rgba(18, 18, 18, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    background-color: rgba(34, 40, 49, 0.9);
    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.5);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: #f5f5f5;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    color: #f5f5f5;
    cursor: pointer;
}

.close-button:hover {
    color: #48bb78;
}

h2 {
    text-align: center;
    color: #48bb78;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #a0aec0;
    font-size: 14px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #4a5568;
    border-radius: 6px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
}

.button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.btn-primary {
    background-color: #48bb78;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
    flex: 1;
}

.btn-primary:hover {
    background-color: #38a169;
}

.btn-secondary {
    background-color: #4a5568;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
    flex: 1;
}

.btn-secondary:hover {
    background-color: #2d3748;
}
</style>
