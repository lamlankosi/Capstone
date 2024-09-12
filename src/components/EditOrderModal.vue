<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <h2>Edit Order</h2>
            <form @submit.prevent="updateOrderDetails">

                <div class="form-group">
                    <label for="status">status</label>
                    <input type="text" id="status" v-model="form.status" class="form-control"  />
                </div>
                <div class="form-group">
                    <label for="totalAmount">totalAmount</label>
                    <input type="number" id="totalAmount" v-model="form.totalAmount" class="form-control"  />
                </div>
                <div class="form-group">
                    <label for="Location">Date & Time</label>
                    <input type="datetime" id="Location" v-model="form.orderDate" class="form-control"  />
                </div>
                <button type="submit" class="btn btn-primary">Update Order</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
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
                totalAmount:'',
            }
        }
    },
    watch: {
        order: {
            immediate: true,
            handler(newOrder) {
                if (newOrder) {
                    this.form = { ...newOrder }
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

            }

            this.$store.dispatch('updateOrder', data)
            this.closeModal()
        },
        closeModal() {
            this.$emit('update:visible', false)
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
