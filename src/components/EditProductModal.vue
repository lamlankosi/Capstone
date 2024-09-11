<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <h2>Edit Product</h2>
            <form @submit.prevent="updateProductDetails">
                <div class="form-group">
                    <label for="prodName">Product Name</label>
                    <input type="text" id="prodName" v-model="form.prodName" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <input type="text" id="category" v-model="form.category" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" v-model="form.description" class="form-control" required></textarea>
                </div>
                <div class="form-group">
                    <label for="stock">Stock</label>
                    <input type="number" id="stock" v-model="form.stock" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" id="price" v-model="form.price" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="prodUrl">Image URL</label>
                    <input type="text" id="prodUrl" v-model="form.prodUrl" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary">Update Product</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditProductModal',
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        product: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            form: {
                prodName: '',
                category: '',
                description: '',
                stock: '',
                price: '',
                prodUrl: '',
            }
        }
    },
    watch: {
        product: {
            immediate: true,
            handler(newProduct) {
                if (newProduct) {
                    this.form = { ...newProduct };
                }
            }
        }
    },
    methods: {
        updateProductDetails() {
            const data = {
                id : this.form.prodID,
                cred : {
                    prodName: this.form.prodName,
                    category: this.form.category,
                    description: this.form.description,
                    price: this.form.price,
                    stock: this.form.stock,
                    prodUrl: this.form.prodUrl,
                }

            }
            this.$store.dispatch('updateProduct', data);
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