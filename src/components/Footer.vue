<template>
    <footer class="footer">
        <div class="row">
            <p class="lead">
                Lamlankosi Nomnganga &copy; <span id="currYear">{{ cYear }}</span>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            cYear: new Date().getUTCFullYear()
        };
    }
};
</script>

<style scoped>
.footer {
    background: #2E8B57;
    color: white;
    width: 100%;
    text-align: center;
    padding: 15px 0;
    font-size: 14px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    position: fixed; /* Ensures it stays in the wrapper */
    bottom: 0;
    margin-top: auto; /* Pushes footer to the bottom */
}
</style>
